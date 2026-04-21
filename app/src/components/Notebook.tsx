import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useDrag } from "@use-gesture/react";

interface NotebookProps {
  pages: React.ReactNode[];
}

const FLIP_DRAG_PX = 280; // horizontal drag distance for a full page turn
const COMMIT_THRESHOLD = 90;
const VELOCITY_COMMIT = 550;

// Romanette numerals for the back-of-page caption
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

function PageFront({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 paper-bg shadow-paper rounded-r-2xl rounded-l-sm overflow-hidden ring-1 ring-ink-900/10"
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
    >
      {children}
      {/* spine-side inner shadow — page is hinged on the LEFT */}
      <div
        className="absolute left-0 top-0 bottom-0 w-6 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(60,30,10,0.28), rgba(60,30,10,0) 90%)",
        }}
      />
      {/* outer-edge soft shadow — gives the page a leaf-like edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(60,30,10,0.12), rgba(60,30,10,0))",
        }}
      />
    </div>
  );
}

function PageBack({ pageNum }: { pageNum: number }) {
  return (
    <div
      className="absolute inset-0 paper-bg shadow-paper rounded-l-2xl rounded-r-sm overflow-hidden ring-1 ring-ink-900/10"
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* hinge-side shadow on the back is on the RIGHT (mirror of front) */}
      <div
        className="absolute right-0 top-0 bottom-0 w-6 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(60,30,10,0.28), rgba(60,30,10,0) 90%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif italic text-ink-700/30 text-xs tracking-[0.45em] uppercase">
          {ROMAN[pageNum] ?? pageNum + 1}
        </span>
      </div>
    </div>
  );
}

function BookSpine() {
  return (
    <div
      className="absolute -left-3 top-2 bottom-2 w-6 rounded-l-md pointer-events-none"
      style={{
        background:
          "linear-gradient(to right, #2c1408 0%, #5a2d12 35%, #7a3d18 60%, #4a230d 85%, #2c1408 100%)",
        boxShadow:
          "inset 1px 0 0 rgba(255,210,160,0.15), inset -1px 0 4px rgba(0,0,0,0.5), 0 6px 14px rgba(0,0,0,0.45)",
      }}
    >
      {/* faux stitching */}
      <div className="absolute inset-y-3 left-1.5 w-px border-l border-dashed border-cream-100/20" />
      <div className="absolute inset-y-3 right-1.5 w-px border-l border-dashed border-cream-100/15" />
    </div>
  );
}

export default function Notebook({ pages }: NotebookProps) {
  const [index, setIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lockRef = useRef(false);
  const total = pages.length;

  // Live rotation driver. negative drag.x = flip forward (page swings to left)
  const dragX = useMotionValue(0);
  const activeRotateY = useTransform(dragX, [-FLIP_DRAG_PX, 0, FLIP_DRAG_PX], [-180, 0, 0]);
  const prevRotateY = useTransform(dragX, [-FLIP_DRAG_PX, 0, FLIP_DRAG_PX], [-180, -180, 0]);

  // Subtle z-lift so the page peels off the stack while turning
  const liftZ = useTransform(dragX, (v) => Math.min(24, Math.abs(v) / FLIP_DRAG_PX * 24));
  // Curl-shadow strength along the spine while the page is mid-flip
  const flipShadow = useTransform(dragX, (v) =>
    Math.min(0.5, (Math.abs(v) / FLIP_DRAG_PX) * 0.5)
  );

  const stackRef = useRef<HTMLDivElement | null>(null);

  // Keyboard support — left/right arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") commit("next");
      if (e.key === "ArrowLeft") commit("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const commit = async (dir: "next" | "prev") => {
    if (lockRef.current) return;
    if (dir === "next" && index >= total - 1) return;
    if (dir === "prev" && index <= 0) return;
    lockRef.current = true;
    setHasInteracted(true);
    const target = dir === "next" ? -FLIP_DRAG_PX : FLIP_DRAG_PX;
    await animate(dragX, target, {
      type: "tween",
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    });
    setIndex((i) => (dir === "next" ? i + 1 : i - 1));
    dragX.set(0);
    lockRef.current = false;
  };

  const releaseToRest = () => {
    animate(dragX, 0, { type: "spring", stiffness: 280, damping: 30 });
  };

  const bind = useDrag(
    ({ movement: [mx], velocity: [vx], first, last, tap }) => {
      if (lockRef.current) return;
      if (first) setHasInteracted(true);
      if (tap) return; // ignore pure taps — the separate onClick handles those
      dragX.set(mx);
      if (last) {
        const vxPxPerMs = vx * 1000; // @use-gesture gives px/ms
        if (mx < -COMMIT_THRESHOLD || vxPxPerMs < -VELOCITY_COMMIT) commit("next");
        else if (mx > COMMIT_THRESHOLD || vxPxPerMs > VELOCITY_COMMIT) commit("prev");
        else releaseToRest();
      }
    },
    {
      filterTaps: true,
      pointer: { touch: true },
    }
  );

  const onTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lockRef.current) return;
    if (!stackRef.current) return;
    const rect = stackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width * 0.55) commit("next");
    else if (x < rect.width * 0.35) commit("prev");
  };

  const currentPage = pages[index];
  const nextPage = pages[index + 1];
  const prevPage = pages[index - 1];

  return (
    <div
      {...bind()}
      className="notebook-root relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {/* Warm leather/wood backdrop */}
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
        style={{ perspective: 1600, perspectiveOrigin: "50% 50%" }}
      >
        {/* Ground shadow */}
        <div className="absolute -bottom-6 left-8 right-8 h-6 rounded-full bg-black/55 blur-xl" />

        {/* Book frame */}
        <div ref={stackRef} className="absolute inset-0" onClick={onTap}>
          <BookSpine />

          {/* The next page sits underneath, ready to be revealed */}
          {nextPage && (
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
              <PageFront>{nextPage}</PageFront>
            </div>
          )}

          {/* Previous page (only animates when user is dragging back) */}
          {prevPage && (
            <motion.div
              key={`prev-${index}`}
              className="absolute inset-0 will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "left center",
                rotateY: prevRotateY,
                z: liftZ,
                zIndex: 9,
                pointerEvents: "none",
              }}
            >
              <PageFront>{prevPage}</PageFront>
              <PageBack pageNum={index - 1} />
            </motion.div>
          )}

          {/* Active (top) page — purely visual, no gesture handlers here. */}
          <motion.div
            key={`page-${index}`}
            className="absolute inset-0 will-change-transform select-none pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              rotateY: activeRotateY,
              z: liftZ,
              zIndex: 10,
            }}
          >
            <PageFront>{currentPage}</PageFront>
            <PageBack pageNum={index} />

            {/* Curl-shadow along the spine that intensifies during flip */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-12"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))",
                opacity: flipShadow,
              }}
            />
          </motion.div>

        </div>

        {/* swipe / tap hint */}
        <AnimatePresence>
          {!hasInteracted && index === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: [-2, 6, -2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 right-6 flex items-center gap-2 pointer-events-none z-30"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-rust-600/80 font-sans">
                swipe / tap
              </span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-rust-600">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page indicator */}
        <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1.5 z-30">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                if (lockRef.current) return;
                if (i === index) return;
                setHasInteracted(true);
                setIndex(i);
                dragX.set(0);
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
