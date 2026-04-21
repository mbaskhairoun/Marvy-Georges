import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

export interface EnvelopeSceneProps {
  onOpened: () => void;
}

// Both PNGs are 1408×768 (aspect ≈ 1.833:1). Body and flap share the same
// canvas so they must render at identical size and position — the alpha in
// each PNG does the silhouette work.
const BODY_W = 4.0;
const BODY_H = BODY_W / (1408 / 768);  // ≈ 1.80
const FLAP_W = BODY_W;
const FLAP_H = BODY_H;

// -----------------------------------------------------------------------------
// Wax Seal — single PNG (/seal.png) rendered on a transparent plane.
// -----------------------------------------------------------------------------
function WaxSeal() {
  const groupRef = useRef<THREE.Group>(null);
  const sealTex = useTexture('/seal.webp');

  // Sharper rendering on retina, correct gamma
  useMemo(() => {
    if (sealTex) {
      sealTex.anisotropy = 16;
      sealTex.colorSpace = THREE.SRGBColorSpace;
      sealTex.needsUpdate = true;
    }
  }, [sealTex]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z = -0.14;
    }
  });

  return (
    <group ref={groupRef} position={[0, -FLAP_H * 0.46, 0.02]}>
      <mesh renderOrder={3}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial
          map={sealTex}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// -----------------------------------------------------------------------------
// Triangular Flap (back of envelope) — hinged at top edge
// -----------------------------------------------------------------------------
function TriangularFlap({ opening, children }: { opening: boolean; children?: React.ReactNode }) {
  const hingeRef = useRef<THREE.Group>(null);
  const [rot, setRot] = useState(0);

  const flapTex = useTexture('/envelop-flap.webp');
  useMemo(() => {
    if (flapTex) {
      flapTex.anisotropy = 16;
      flapTex.colorSpace = THREE.SRGBColorSpace;
      flapTex.needsUpdate = true;
    }
  }, [flapTex]);

  useFrame((_, delta) => {
    if (opening) {
      const target = -(42 * Math.PI) / 180;
      setRot((r) => r + (target - r) * Math.min(1, delta * 0.45));
    }
    if (hingeRef.current) {
      hingeRef.current.rotation.x = rot;
    }
  });

  // The flap plane has the SAME dimensions and center as the body plane, so
  // the two PNGs overlap pixel-for-pixel. We park the hinge group at the
  // body's top edge so rotation pivots there; the plane is shifted down by
  // BODY_H/2 inside the hinge so its centre sits on the body centre.
  return (
    <group position={[0, BODY_H / 2, 0.04]}>
      <group ref={hingeRef}>
        <mesh position={[0, -FLAP_H / 2, 0]} renderOrder={1}>
          <planeGeometry args={[FLAP_W, FLAP_H]} />
          <meshBasicMaterial
            map={flapTex}
            transparent
            toneMapped={false}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Wax seal travels with the flap */}
        {children}
      </group>
    </group>
  );
}

// -----------------------------------------------------------------------------
// Envelope body — textured plane
// -----------------------------------------------------------------------------
function EnvelopeBody() {
  const bodyTex = useTexture('/envelop-body.webp');
  useMemo(() => {
    if (bodyTex) {
      bodyTex.anisotropy = 16;
      bodyTex.colorSpace = THREE.SRGBColorSpace;
      bodyTex.needsUpdate = true;
    }
  }, [bodyTex]);

  return (
    <mesh renderOrder={0}>
      <planeGeometry args={[BODY_W, BODY_H]} />
      <meshBasicMaterial
        map={bodyTex}
        transparent
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// -----------------------------------------------------------------------------
// Envelope assembly with idle bob + opening glow
// -----------------------------------------------------------------------------
function Envelope({ opening, onTap }: { opening: boolean; onTap: () => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current && !opening) {
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.05;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.025;
      groupRef.current.rotation.x = Math.sin(t * 0.7) * 0.03;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        onTap();
      }}
    >
      <EnvelopeBody />
      <TriangularFlap opening={opening}>
        <group position={[0, 0, 0.014]}>
          <WaxSeal />
        </group>
      </TriangularFlap>
    </group>
  );
}

// -----------------------------------------------------------------------------
// Dust particles overlay
// -----------------------------------------------------------------------------
function Dust() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 6,
        dur: 8 + Math.random() * 10,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-100/30"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [-10, -40, -10],
            x: [0, 8, -6, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Scene
// -----------------------------------------------------------------------------
export default function EnvelopeScene(props: EnvelopeSceneProps): JSX.Element {
  const { onOpened } = props;
  const [opening, setOpening] = useState(false);

  const handleTap = () => {
    if (opening) return;
    setOpening(true);
    // Let the flap lift slowly for a while before the crossfade begins.
    window.setTimeout(() => onOpened(), 2400);
  };

  return (
    <div
      className="fixed inset-0 z-50 select-none overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, #3a2412 0%, #1a0d06 55%, #06030a 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />
      <Dust />

      <AnimatePresence>
        {!opening && (
          <motion.div
            key="top"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute left-0 right-0 top-[8%] flex flex-col items-center text-center"
          >
            <div
              style={{
                color: '#c8a05a',
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                textTransform: 'uppercase',
                letterSpacing: '0.38em',
                fontSize: '0.7rem',
              }}
            >
              an invitation from
            </div>
            <div
              className="mt-2"
              style={{
                color: '#f5ecdc',
                fontFamily: 'Italiana, "Cormorant Garamond", serif',
                fontWeight: 400,
                letterSpacing: '0.04em',
                fontSize: '1.9rem',
                textShadow: '0 2px 20px rgba(200,160,90,0.25)',
              }}
            >
              Georges &amp; Marvy
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: 'min(88vw, 460px)',
            height: 'min(110vw, 600px)',
          }}
        >
          <Canvas
            camera={{ position: [0, -0.2, 5], fov: 38 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.55} />
              <pointLight
                position={[-3, 4, 4]}
                intensity={22}
                color="#ffcf85"
                distance={20}
                decay={2}
              />
              <pointLight
                position={[3, -2, 4]}
                intensity={10}
                color="#f0d4a4"
                distance={18}
                decay={2}
              />
              <directionalLight position={[2, 3, 5]} intensity={0.9} color="#fff1d6" />
              <Environment preset="sunset" />
              <Envelope opening={opening} onTap={handleTap} />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <AnimatePresence>
        {!opening && (
          <motion.div
            key="tap"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.45, 1, 0.45] }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute bottom-[10%] left-0 right-0 text-center"
          >
            <span
              style={{
                fontFamily: 'Parisienne, "Cormorant Garamond", cursive',
                fontSize: '1.7rem',
                color: '#e8d4a8',
                fontStyle: 'italic',
                textShadow: '0 1px 12px rgba(200,160,90,0.35)',
              }}
            >
              tap to open
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
