import { useState, Suspense, lazy, useEffect } from "react";
import { motion } from "framer-motion";

const EnvelopeScene = lazy(() => import("./scenes/EnvelopeScene"));

import Notebook from "./components/Notebook";
import PageCover from "./components/pages/PageCover";
import PageWelcome from "./components/pages/PageWelcome";
import PageDate from "./components/pages/PageDate";
import PageVenue from "./components/pages/PageVenue";
import PageDresscode from "./components/pages/PageDresscode";
import PageBar from "./components/pages/PageBar";
import PageRSVP from "./components/pages/PageRSVP";

// Venue images referenced inside the notebook pages. We kick off their
// download as soon as the app mounts — while the user is still looking at
// the envelope — so they're already cached when the notebook fades in.
const NOTEBOOK_IMAGES = [
  "/venue/entrance-wide.webp",
  "/venue/cheers.webp",
  "/venue/barrel-room-dark.webp",
  "/venue/barrel-room.webp",
  "/venue/entrance-day.webp",
  "/venue/gate-night.webp",
  "/venue/brick-arch.webp",
  "/venue/hall-day.webp",
  "/venue/hall-alt.webp",
  "/venue/house.webp",
];

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-cream-100 font-serif italic">
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        preparing your invitation…
      </motion.span>
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);

  // Warm the browser cache with every notebook image during the envelope
  // phase. Runs once on mount; each `new Image()` triggers a background
  // fetch in parallel. By the time the notebook fades in, the files are
  // already in memory and render instantly.
  useEffect(() => {
    NOTEBOOK_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const pages = [
    <PageCover key="cover" />,
    <PageWelcome key="welcome" />,
    <PageDate key="date" />,
    <PageVenue key="venue" />,
    <PageDresscode key="dresscode" />,
    <PageBar key="bar" />,
    <PageRSVP key="rsvp" />,
  ];

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black">
      {/* Notebook sits behind; it fades in while the envelope scene is still
          animating its zoom + flap, so the user never sees an empty interior. */}
      <motion.div
        className="absolute inset-0 h-[100dvh]"
        initial={false}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: opened ? "auto" : "none" }}
      >
        <Notebook pages={pages} />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-40"
        initial={{ opacity: 1 }}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: opened ? "none" : "auto" }}
      >
        <Suspense fallback={<Loader />}>
          <EnvelopeScene onOpened={() => setOpened(true)} />
        </Suspense>
      </motion.div>
    </div>
  );
}
