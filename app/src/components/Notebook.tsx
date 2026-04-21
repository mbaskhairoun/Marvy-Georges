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
  const [size, setSize] = useState({ w: 360, h: 620 });

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

  return (
    <div className="notebook-root relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
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
      >
        {pages.map((node, i) => (
          <Page key={i}>{node}</Page>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
