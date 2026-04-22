import React, { forwardRef, useEffect, useRef, useState } from "react";
// @ts-ignore - react-pageflip ships no TS types
import HTMLFlipBook from "react-pageflip";

interface NotebookProps {
  pages: React.ReactNode[];
}

// Transparent wrapper — the content page (PageCover / PageWelcome / …) owns
// all visual styling so nothing double-wraps or clips.
const Page = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
  function Page({ children }, ref) {
    return (
      <div ref={ref} className="relative w-full h-full overflow-hidden">
        {children}
      </div>
    );
  }
);

export default function Notebook({ pages }: NotebookProps) {
  const bookRef = useRef<unknown>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const originalsRef = useRef<Set<Element>>(new Set());
  const observerRef = useRef<MutationObserver | null>(null);
  const [size, setSize] = useState({ w: 360, h: 620 });
  const [currentPage, setCurrentPage] = useState(0);

  const flipPrev = () => {
    const api = (bookRef.current as { pageFlip?: () => unknown } | null)?.pageFlip?.() as
      | { flipPrev?: () => void }
      | undefined;
    api?.flipPrev?.();
  };
  const flipNext = () => {
    const api = (bookRef.current as { pageFlip?: () => unknown } | null)?.pageFlip?.() as
      | { flipNext?: () => void }
      | undefined;
    api?.flipNext?.();
  };

  // Size the book to fill most of the viewport so the content pages —
  // designed around max-w-sm × 82dvh — still fit comfortably.
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const targetW = Math.min(vw - 24, 440);
      const targetH = Math.min(vh - 40, targetW * 1.65);
      setSize({ w: Math.round(targetW), h: Math.round(targetH) });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // page-flip animates a flip by deep-cloning the current page's DOM and
  // curling the clone on top. Without intervention, the curling "back" shows
  // the same content as the front. We record the originals after init, then
  // tag any later-added .stf__item as a clone so CSS can blank its interior.
  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const handleInit = () => {
    const root = rootRef.current;
    if (!root) return;
    originalsRef.current.clear();
    root
      .querySelectorAll(".stf__item")
      .forEach((el) => originalsRef.current.add(el));

    observerRef.current?.disconnect();
    observerRef.current = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (
            n instanceof HTMLElement &&
            n.classList.contains("stf__item") &&
            !originalsRef.current.has(n)
          ) {
            n.setAttribute("data-flip-clone", "true");
          }
        });
      }
    });
    observerRef.current.observe(root, { childList: true, subtree: true });
  };

  return (
    <div
      ref={rootRef}
      className="notebook-root relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Dark leather backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #2c1c10 0%, #1a0e07 55%, #0c0604 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)]" />

      {/* Ground shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/60 blur-xl"
        style={{
          width: size.w * 0.9,
          height: 20,
          bottom: `calc(50% - ${size.h / 2 + 24}px)`,
        }}
      />

      {/* @ts-ignore react-pageflip has no ts types */}
      <HTMLFlipBook
        ref={bookRef}
        width={size.w}
        height={size.h}
        size="fixed"
        minWidth={280}
        maxWidth={600}
        minHeight={420}
        maxHeight={1000}
        maxShadowOpacity={0.55}
        showCover={false}
        mobileScrollSupport={false}
        drawShadow={true}
        flippingTime={900}
        usePortrait={true}
        startZIndex={5}
        autoSize={false}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={24}
        showPageCorners={true}
        disableFlipByClick={false}
        className=""
        style={{}}
        startPage={0}
        onInit={handleInit}
        onFlip={(e: { data: number }) => setCurrentPage(e.data)}
      >
        {pages.map((node, i) => (
          <Page key={i}>{node}</Page>
        ))}
      </HTMLFlipBook>

      {/* Side nav chevrons — provide a dependable flip affordance when the
          corner drag / swipe gesture is hard to discover. */}
      {currentPage > 0 && (
        <button
          type="button"
          aria-label="Previous page"
          onClick={flipPrev}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-14 flex items-center justify-center text-brass-400/70 hover:text-brass-400 active:text-cream-100 transition-colors"
        >
          <svg
            width="18"
            height="28"
            viewBox="0 0 18 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M13 3 L3 14 L13 25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {currentPage < pages.length - 1 && (
        <button
          type="button"
          aria-label="Next page"
          onClick={flipNext}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-14 flex items-center justify-center text-brass-400/70 hover:text-brass-400 active:text-cream-100 transition-colors"
        >
          <svg
            width="18"
            height="28"
            viewBox="0 0 18 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 3 L15 14 L5 25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
