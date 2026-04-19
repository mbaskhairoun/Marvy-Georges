import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

export interface EnvelopeSceneProps {
  onOpened: () => void;
}

const BODY_W = 3.0;
const BODY_H = 2.1;
const BODY_D = 0.08;
const FLAP_W = BODY_W / 2;   // half-width of triangle base (hinge length = BODY_W)
const FLAP_H = 1.05;         // tip drops to ~middle of body

// -----------------------------------------------------------------------------
// Wax Seal — gold disk with monogram texture clearly visible on top
// -----------------------------------------------------------------------------
function WaxSeal({ opening }: { opening: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const monoRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  const texture = useTexture('/initials.jpeg');

  // Recolor the blue-on-cream monogram into a wax-toned emboss: dark parts of
  // the original (the initials) become bright wax highlight, light parts become
  // a deep wax recess. We also build a matching height map for bump emboss.
  const { embossMap } = useMemo(() => {
    if (!texture?.image) return { embossMap: texture, embossBump: texture };
    const img = texture.image as HTMLImageElement | ImageBitmap;
    const w = (img as HTMLImageElement).naturalWidth || (img as ImageBitmap).width || 512;
    const h = (img as HTMLImageElement).naturalHeight || (img as ImageBitmap).height || 512;

    const colorCanvas = document.createElement('canvas');
    colorCanvas.width = w;
    colorCanvas.height = h;
    const cctx = colorCanvas.getContext('2d');

    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = w;
    bumpCanvas.height = h;
    const bctx = bumpCanvas.getContext('2d');

    if (!cctx || !bctx) return { embossMap: texture, embossBump: texture };

    cctx.drawImage(img as CanvasImageSource, 0, 0, w, h);
    const src = cctx.getImageData(0, 0, w, h);
    const bump = bctx.createImageData(w, h);
    const dst = src.data;
    const bd = bump.data;

    // Wax color stops (deep recess → bright highlight) with strong contrast
    const DARK = { r: 0x20, g: 0x0e, b: 0x02 };
    const MID = { r: 0x8e, g: 0x54, b: 0x18 };
    const BRIGHT = { r: 0xff, g: 0xdd, b: 0x88 };

    for (let i = 0; i < dst.length; i += 4) {
      const lum = (dst[i] * 0.3 + dst[i + 1] * 0.59 + dst[i + 2] * 0.11) / 255;
      // Invert + strong gamma so the initials dominate the disc.
      const t = Math.pow(1 - lum, 0.5);
      let r: number, g: number, b: number;
      if (t < 0.5) {
        const k = t * 2;
        r = DARK.r + (MID.r - DARK.r) * k;
        g = DARK.g + (MID.g - DARK.g) * k;
        b = DARK.b + (MID.b - DARK.b) * k;
      } else {
        const k = (t - 0.5) * 2;
        r = MID.r + (BRIGHT.r - MID.r) * k;
        g = MID.g + (BRIGHT.g - MID.g) * k;
        b = MID.b + (BRIGHT.b - MID.b) * k;
      }
      dst[i] = r;
      dst[i + 1] = g;
      dst[i + 2] = b;
      dst[i + 3] = 255;

      const bv = Math.floor(t * 255);
      bd[i] = bv;
      bd[i + 1] = bv;
      bd[i + 2] = bv;
      bd[i + 3] = 255;
    }
    cctx.putImageData(src, 0, 0);
    bctx.putImageData(bump, 0, 0);

    const colorTex = new THREE.CanvasTexture(colorCanvas);
    colorTex.colorSpace = THREE.SRGBColorSpace;
    colorTex.anisotropy = 16;
    colorTex.needsUpdate = true;

    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    bumpTex.anisotropy = 16;
    bumpTex.needsUpdate = true;

    return { embossMap: colorTex, embossBump: bumpTex };
  }, [texture]);

  // Procedural bump for the wax surface so it doesn't read as plastic.
  const waxBump = useMemo(() => {
    const size = 128;
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      const n = 170 + Math.floor(Math.random() * 80);
      data[i * 4 + 0] = n;
      data[i * 4 + 1] = n;
      data[i * 4 + 2] = n;
      data[i * 4 + 3] = 255;
    }
    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.needsUpdate = true;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  // Clean annular ring — perfectly circular outer + inner; no wobble.
  const rimShape = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, 0.255, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.238, 0, Math.PI * 2, true);
    s.holes.push(hole);
    return s;
  }, []);

  useFrame((_, delta) => {
    if (opening) setProgress((p) => Math.min(1, p + delta * 0.8));
    const p = progress;
    if (groupRef.current) {
      const pulse = p < 0.2 ? 1 + p * 1.4 : 1.28 - (p - 0.2) * 1.6;
      groupRef.current.scale.setScalar(Math.max(0.001, pulse));
      groupRef.current.rotation.z = -0.14 + p * 0.7; // slight natural tilt
    }
    if (monoRef.current) {
      const mat = monoRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 1 - Math.max(0, (p - 0.4)) * 1.7;
      mat.transparent = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, -FLAP_H + 0.14, 0.065]}>
      {/* Raised ridge — the only outer form now; acts as the seal's perimeter */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry
          args={[
            rimShape,
            {
              depth: 0.018,
              bevelEnabled: true,
              bevelThickness: 0.012,
              bevelSize: 0.012,
              bevelSegments: 3,
              curveSegments: 24,
            },
          ]}
        />
        <meshStandardMaterial
          color="#b47a2a"
          metalness={0.2}
          roughness={0.5}
          bumpMap={waxBump}
          bumpScale={0.04}
          emissive="#3a1d06"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Recessed well inside the ridge — darker wax behind the monogram */}
      <mesh position={[0, 0, 0.001]}>
        <circleGeometry args={[0.243, 64]} />
        <meshStandardMaterial
          color="#5e340d"
          metalness={0.1}
          roughness={0.7}
          emissive="#1e0e04"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Monogram — floats inside the ring hole, slightly tilted CCW */}
      <mesh ref={monoRef} position={[0, 0, 0.05]} rotation={[0, 0, 0.08]} renderOrder={2}>
        <circleGeometry args={[0.235, 64]} />
        <meshBasicMaterial
          map={embossMap}
          color="#ffffff"
          toneMapped={false}
          transparent
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

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-FLAP_W, 0);
    s.lineTo(FLAP_W, 0);
    s.lineTo(0, -FLAP_H);
    s.lineTo(-FLAP_W, 0);
    return s;
  }, []);

  useFrame((_, delta) => {
    if (opening) {
      // Stop well before the interior is revealed; very slow ease-out.
      const target = -(42 * Math.PI) / 180;
      setRot((r) => r + (target - r) * Math.min(1, delta * 0.45));
    }
    if (hingeRef.current) {
      hingeRef.current.rotation.x = rot;
    }
  });

  // Single front-face triangle outline, nudged only slightly in front of the
  // flap's front face. No back-face edges, so nothing can draw on top of the
  // seal above it.
  const edgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0x5a3a22,
        transparent: false,
        depthWrite: true,
        depthTest: true,
      }),
    []
  );

  const edgeLines = useMemo(() => {
    const z = 0.0605; // flap depth is 0.06; sit 0.5mm in front
    const pts = [
      new THREE.Vector3(-FLAP_W, 0, z),
      new THREE.Vector3(FLAP_W, 0, z),
      new THREE.Vector3(0, -FLAP_H, z),
      new THREE.Vector3(-FLAP_W, 0, z),
    ];
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    return new THREE.Line(geom, edgeMat);
  }, [edgeMat]);

  // Hinge group is positioned at the TOP edge of the body (y = +BODY_H/2),
  // slightly in front of the body face so it sits cleanly on top.
  return (
    <group position={[0, BODY_H / 2, BODY_D / 2 + 0.001]}>
      <group ref={hingeRef}>
        {/* Triangular flap mesh — thicker so sides are visibly 3D */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry
            args={[shape, { depth: 0.06, bevelEnabled: false, curveSegments: 8 }]}
          />
          <meshStandardMaterial
            color="#f0e3c8"
            roughness={0.94}
            metalness={0.02}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Real edge silhouette — traces the triangle's actual edges */}
        <primitive object={edgeLines} />
        {/* Wax seal travels with the flap so it sits on its tip */}
        {children}
      </group>
    </group>
  );
}

// -----------------------------------------------------------------------------
// Envelope body + back triangular seams (suggesting where side flaps meet)
// -----------------------------------------------------------------------------
function EnvelopeBody() {
  // Two diagonal "seam" lines on the back of the envelope going from the
  // top-left and top-right corners down to the bottom-center, forming the
  // classic envelope V pattern that is normally hidden behind the flap.
  return (
    <group>
      <RoundedBox
        args={[BODY_W, BODY_H, BODY_D]}
        radius={0.04}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#f0e3c8"
          roughness={0.94}
          metalness={0.02}
        />
      </RoundedBox>
    </group>
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
          <WaxSeal opening={opening} />
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
            shadows
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
