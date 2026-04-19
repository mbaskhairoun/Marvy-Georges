import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  PanInfo,
} from "framer-motion";

interface NotebookProps {
  pages: React.ReactNode[];
}

const SPIRAL_LOOPS = 14;
const SPIRAL_TOP_OFFSET = 18;
const FLIP_DRAG_PX = 320;       // drag distance for a full flip
const COMMIT_THRESHOLD = 110;
const VELOCITY_COMMIT = 600;
const MAX_TILT_DEG = 18;        // diagonal tilt when finger is at the corner

// ---- Wire pieces ----------------------------------------------------------
function WireLoopFront({ x }: { x: number }) {
  const id = `wlf-${Math.round(x)}`;
  return (
    <svg
      className="absolute"
      style={{ left: x - 8, top: 6, width: 16, height: 38 }}
      viewBox="0 0 16 38"
      fill="none"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6b06b" />
          <stop offset="0.5" stopColor="#8e6a32" />
          <stop offset="1" stopColor="#5a3f1c" />
        </linearGradient>
      </defs>
      <path
        d="M3 16 C 3 28, 13 28, 13 16"
        stroke={`url(#${id})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4.5 18 C 5 24, 11 24, 11.5 18"
        stroke="rgba(255,235,180,0.45)"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function WireLoopBack({ x }: { x: number }) {
  const id = `wlb-${Math.round(x)}`;
  return (
    <svg
      className="absolute"
      style={{ left: x - 8, top: 6, width: 16, height: 38 }}
      viewBox="0 0 16 38"
      fill="none"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a5928" />
          <stop offset="0.5" stopColor="#a78248" />
          <stop offset="1" stopColor="#d6b06b" />
        </linearGradient>
      </defs>
      <path
        d="M3 16 C 3 4, 13 4, 13 16"
        stroke={`url(#${id})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function loopPositions(widthPx: number) {
  const margin = 22;
  const usable = Math.max(40, widthPx - margin * 2);
  const step = usable / (SPIRAL_LOOPS - 1);
  return Array.from({ length: SPIRAL_LOOPS }, (_, i) => margin + step * i);
}

function PageHoles({ widthPx }: { widthPx: number }) {
  const xs = loopPositions(widthPx);
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
      {xs.map((x, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: x - 5,
            top: 6,
            width: 10,
            height: 10,
            background:
              "radial-gradient(circle at 50% 35%, #2a1408 0%, #6b3f1c 60%, transparent 75%)",
            boxShadow:
              "inset 0 1px 1.5px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.4)",
          }}
        />
      ))}
    </div>
  );
}

function PageCard({
  children,
  widthPx,
}: {
  children: React.ReactNode;
  widthPx: number;
}) {
  return (
    <div
      className="h-full w-full paper-bg shadow-paper relative overflow-hidden ring-1 ring-ink-900/10 rounded-b-2xl rounded-t-md"
      style={{ backfaceVisibility: "hidden" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-7 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(60,30,10,0.10), transparent)",
        }}
      />
      <PageHoles widthPx={widthPx} />
      <div className="absolute inset-0 pt-6">{children}</div>
      <div className="pointer-events-none absolute inset-2 top-7 rounded-xl border border-ink-900/5" />
    </div>
  );
}

export default function Notebook({ pages }: NotebookProps) {
  const [index, setIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [, setDirection] = useState<"next" | "prev" | null>(null);
  const [originXPct, setOriginXPct] = useState(50);
  const lockRef = useRef(false);
  const total = pages.length;

  // Motion values driving the live transform
  const dragY = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Forward flip: drag.y goes 0 → -FLIP_DRAG_PX, page rotates 0 → -180°
  // Drag down on the active page does NOT rotate it — we render the prev page
  // on top with its own transform when going back.
  const activeRotateX = useTransform(dragY, [-FLIP_DRAG_PX, 0, FLIP_DRAG_PX], [-180, 0, 0]);
  const prevRotateX = useTransform(dragY, [-FLIP_DRAG_PX, 0, FLIP_DRAG_PX], [-180, -180, 0]);
  const liftZ = useTransform(dragY, [-FLIP_DRAG_PX, 0, FLIP_DRAG_PX], [16, 0, 16]);
  const flipShadow = useTransform(dragY, (v) =>
    Math.min(0.45, (Math.abs(v) / FLIP_DRAG_PX) * 0.45)
  );

  // Tilt baseline captured on pan start, scaled live during pan
  const tiltAmountRef = useRef(0);

  // Container measurement (so wire / holes line up exactly with the page)
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [pageWidth, setPageWidth] = useState(320);
  useEffect(() => {
    const measure = () => {
      if (stackRef.current) {
        setPageWidth(stackRef.current.getBoundingClientRect().width);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const commit = async (dir: "next" | "prev") => {
    if (lockRef.current) return;
    if (dir === "next" && index >= total - 1) return;
    if (dir === "prev" && index <= 0) return;
    lockRef.current = true;
    setHasInteracted(true);
    setDirection(dir);

    const target = dir === "next" ? -FLIP_DRAG_PX : FLIP_DRAG_PX;
    const settle = animate(dragY, target, {
      type: "tween",
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    });
    animate(rotateY, 0, { type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] });
    await settle;

    setIndex((i) => (dir === "next" ? i + 1 : i - 1));
    dragY.set(0);
    rotateY.set(0);
    setDirection(null);
    setOriginXPct(50);
    lockRef.current = false;
  };

  const releaseToRest = () => {
    animate(dragY, 0, { type: "spring", stiffness: 320, damping: 30 });
    animate(rotateY, 0, { type: "spring", stiffness: 320, damping: 30 });
  };

  const onPanStart = (_: unknown, info: PanInfo) => {
    if (lockRef.current) return;
    setHasInteracted(true);
    if (!stackRef.current) return;
    const rect = stackRef.current.getBoundingClientRect();
    const localX = info.point.x - rect.left;
    const xPct = Math.max(2, Math.min(98, (localX / rect.width) * 100));
    setOriginXPct(xPct);
    // Center the tilt on the touched corner: -1 at far left, +1 at far right.
    tiltAmountRef.current = ((xPct - 50) / 50) * MAX_TILT_DEG;
  };

  const onPan = (_: unknown, info: PanInfo) => {
    if (lockRef.current) return;
    dragY.set(info.offset.y);
    const progress = Math.min(1, Math.abs(info.offset.y) / FLIP_DRAG_PX);
    // The diagonal tilt only manifests during the flip — fades back at rest.
    rotateY.set(tiltAmountRef.current * progress);
  };

  const onPanEnd = (_: unknown, info: PanInfo) => {
    if (lockRef.current) return;
    const dy = info.offset.y;
    const vy = info.velocity.y;
    if (dy < -COMMIT_THRESHOLD || vy < -VELOCITY_COMMIT) {
      commit("next");
    } else if (dy > COMMIT_THRESHOLD || vy > VELOCITY_COMMIT) {
      commit("prev");
    } else {
      releaseToRest();
    }
  };

  const currentPage = pages[index];
  const nextPage = pages[index + 1];
  const prevPage = pages[index - 1];

  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #2c1c10 0%, #1a0e07 55%, #0c0604 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)]" />

      <div
        className="relative w-full max-w-sm h-[82dvh] mx-auto"
        style={{ perspective: 1800, perspectiveOrigin: "50% 0%" }}
      >
        <div className="absolute -bottom-6 left-10 right-10 h-6 rounded-full bg-black/55 blur-xl" />

        <div ref={stackRef} className="absolute inset-x-5 top-2 bottom-0">
          {/* BACK halves of the wire — sit BEHIND the pages */}
          <div
            className="pointer-events-none absolute left-0 right-0"
            style={{ top: -SPIRAL_TOP_OFFSET, height: 44, zIndex: 1 }}
          >
            {loopPositions(pageWidth).map((x, i) => (
              <WireLoopBack x={x} key={`b-${i}`} />
            ))}
          </div>

          {/* peek of the next page underneath the active page */}
          {nextPage && (
            <div
              className="absolute inset-0"
              style={{
                transform: "translateY(8px) scale(0.985)",
                filter: "brightness(0.96)",
                zIndex: 2,
              }}
            >
              <PageCard widthPx={pageWidth}>{nextPage}</PageCard>
            </div>
          )}

          {/* While dragging DOWN (flipping back), the prev page sits on top
              starting at -180° and rotates back to 0. */}
          {prevPage && (
            <motion.div
              key={`prev-${index}`}
              className="absolute inset-0 will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: `${originXPct}% 0%`,
                rotateX: prevRotateX,
                rotateY: useTransform(rotateY, (v) => -v),
                z: liftZ,
                zIndex: 9,
                pointerEvents: "none",
              }}
            >
              <PageCard widthPx={pageWidth}>{prevPage}</PageCard>
            </motion.div>
          )}

          {/* Active (top) page — pure pan gesture (no auto-translate),
              rotation pivot follows where the finger landed. */}
          <motion.div
            key={`page-${index}`}
            className="absolute inset-0 will-change-transform touch-none"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: `${originXPct}% 0%`,
              rotateX: activeRotateX,
              rotateY,
              z: liftZ,
              zIndex: 10,
            }}
            onPanStart={onPanStart}
            onPan={onPan}
            onPanEnd={onPanEnd}
          >
            <PageCard widthPx={pageWidth}>{currentPage}</PageCard>
            <motion.div
              className="pointer-events-none absolute -bottom-3 left-4 right-4 h-4 rounded-full blur-xl"
              style={{ background: "rgba(0,0,0,1)", opacity: flipShadow }}
            />
          </motion.div>

          {/* FRONT halves of the wire — sit IN FRONT of the pages */}
          <div
            className="pointer-events-none absolute left-0 right-0"
            style={{ top: -SPIRAL_TOP_OFFSET, height: 44, zIndex: 50 }}
          >
            {loopPositions(pageWidth).map((x, i) => (
              <WireLoopFront x={x} key={`f-${i}`} />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {!hasInteracted && index === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [6, 0, 6] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 left-0 right-0 flex flex-col items-center pointer-events-none z-30"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-rust-600"
              >
                <path
                  d="M6 15l6-6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-1 text-[10px] tracking-[0.3em] uppercase text-rust-600/80 font-sans">
                drag a corner
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1.5 z-30">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (lockRef.current) return;
                setHasInteracted(true);
                setIndex(i);
                dragY.set(0);
                rotateY.set(0);
                setOriginXPct(50);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-5 bg-brass-500" : "w-1.5 bg-cream-200/40"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
