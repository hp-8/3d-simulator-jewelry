import { useMemo } from 'react';

export interface ProceduralProps {
  ringColor: string;
  diamondColor: string;
}

// Shared metal band material — polished metal that reflects the studio HDRI.
function MetalMaterial({ color }: { color: string }) {
  return <meshStandardMaterial color={color} metalness={1} roughness={0.12} envMapIntensity={4} />;
}

// Hero diamond material: full refraction + dispersion ("fire"). flatShading
// keeps the facets crisp; attenuation tints coloured stones through depth.
function GemMaterial({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0}
      roughness={0}
      transmission={1}
      thickness={1.5}
      ior={2.42}
      dispersion={3.5}
      specularIntensity={1}
      attenuationColor={color}
      attenuationDistance={1.6}
      envMapIntensity={3}
      flatShading
    />
  );
}

// Accent material: reflective, sparkly, but non-transmissive so dozens of
// pavé / eternity stones stay cheap to render.
function AccentMaterial({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.1}
      roughness={0}
      clearcoat={1}
      clearcoatRoughness={0}
      reflectivity={1}
      ior={2.4}
      envMapIntensity={4}
      flatShading
    />
  );
}

// Hero gem: octagonal brilliant — crown frustum (table + crown facets +
// girdle) over a pointed pavilion.
function Brilliant({ color, size = 0.42 }: { color: string; size?: number }) {
  const s = size;
  return (
    <group>
      <mesh position={[0, s * 0.225, 0]}>
        <cylinderGeometry args={[s * 0.55, s, s * 0.45, 8]} />
        <GemMaterial color={color} />
      </mesh>
      <mesh position={[0, -s * 0.55, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[s, s * 1.1, 8]} />
        <GemMaterial color={color} />
      </mesh>
    </group>
  );
}

// Small accent stone for pavé / halo / eternity — faceted octahedron.
function Accent({ color, size = 0.1 }: { color: string; size?: number }) {
  return (
    <mesh>
      <octahedronGeometry args={[size, 0]} />
      <AccentMaterial color={color} />
    </mesh>
  );
}

const BAND_R = 1; // band radius; gem sits at the top (+Y)
const GEM_Y = BAND_R + 0.32;

// Small metal bezel/basket under the centre gem so it reads as "set".
function Basket({ color }: { color: string }) {
  return (
    <mesh position={[0, GEM_Y - 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.18, 0.05, 12, 24]} />
      <MetalMaterial color={color} />
    </mesh>
  );
}

export function Solitaire({ ringColor, diamondColor }: ProceduralProps) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[BAND_R, 0.14, 24, 90]} />
        <MetalMaterial color={ringColor} />
      </mesh>
      <Basket color={ringColor} />
      <group position={[0, GEM_Y, 0]}>
        <Brilliant color={diamondColor} size={0.46} />
      </group>
    </group>
  );
}

export function PaveBand({ ringColor, diamondColor }: ProceduralProps) {
  // accent stones marching along the top arc of the band
  const accents = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let i = -5; i <= 5; i++) {
      const a = Math.PI / 2 + i * 0.16;
      out.push([Math.cos(a) * BAND_R, Math.sin(a) * BAND_R, 0.16]);
    }
    return out;
  }, []);
  return (
    <group>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[BAND_R, 0.16, 24, 90]} />
        <MetalMaterial color={ringColor} />
      </mesh>
      {accents.map((p, i) => (
        <group key={i} position={p}>
          <Accent color={diamondColor} size={0.08} />
        </group>
      ))}
      <Basket color={ringColor} />
      <group position={[0, GEM_Y, 0]}>
        <Brilliant color={diamondColor} size={0.4} />
      </group>
    </group>
  );
}

export function Twisted({ ringColor, diamondColor }: ProceduralProps) {
  // two thin crossover bands
  return (
    <group>
      <mesh castShadow receiveShadow rotation={[0, 0, 0.12]} position={[0.04, 0, 0]}>
        <torusGeometry args={[BAND_R, 0.085, 20, 90]} />
        <MetalMaterial color={ringColor} />
      </mesh>
      <mesh castShadow receiveShadow rotation={[0, 0, -0.12]} position={[-0.04, 0, 0]}>
        <torusGeometry args={[BAND_R, 0.085, 20, 90]} />
        <MetalMaterial color={ringColor} />
      </mesh>
      <Basket color={ringColor} />
      <group position={[0, GEM_Y, 0]}>
        <Brilliant color={diamondColor} size={0.42} />
      </group>
    </group>
  );
}

export function Halo({ ringColor, diamondColor }: ProceduralProps) {
  // ring of accents encircling the centre gem
  const halo = useMemo(() => {
    const out: [number, number, number][] = [];
    const n = 12;
    const r = 0.34;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      out.push([Math.cos(a) * r, Math.sin(a) * r, 0]);
    }
    return out;
  }, []);
  return (
    <group>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[BAND_R, 0.14, 24, 90]} />
        <MetalMaterial color={ringColor} />
      </mesh>
      <Basket color={ringColor} />
      <group position={[0, GEM_Y, 0.05]}>
        {halo.map((p, i) => (
          <group key={i} position={p}>
            <Accent color={diamondColor} size={0.07} />
          </group>
        ))}
        <Brilliant color={diamondColor} size={0.4} />
      </group>
    </group>
  );
}

export function Eternity({ ringColor, diamondColor }: ProceduralProps) {
  // accents set all the way around the band
  const stones = useMemo(() => {
    const out: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    const n = 28;
    const r = BAND_R + 0.1; // sit the stones proud on the outer surface of the band
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      out.push({ pos: [Math.cos(a) * r, Math.sin(a) * r, 0], rot: [0, 0, a] });
    }
    return out;
  }, []);
  return (
    <group>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[BAND_R, 0.13, 24, 100]} />
        <MetalMaterial color={ringColor} />
      </mesh>
      {stones.map((s, i) => (
        <group key={i} position={s.pos} rotation={s.rot}>
          <Accent color={diamondColor} size={0.1} />
        </group>
      ))}
    </group>
  );
}

export const PROCEDURAL: Record<string, (p: ProceduralProps) => JSX.Element> = {
  solitaire: Solitaire,
  pave: PaveBand,
  twisted: Twisted,
  halo: Halo,
  eternity: Eternity,
};
