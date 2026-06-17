import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, Center, Float } from '@react-three/drei';
import { RGBELoader } from 'three-stdlib';
import Ring from './ring';

function Turntable({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.3;
  });
  return <group ref={ref}>{children}</group>;
}

function Scene() {
  const texture = useLoader(RGBELoader, '/env.hdr');
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return (
    <>
      <ambientLight intensity={0.6} />
      <Environment map={texture} />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <Turntable>
          <Center>
            <Ring
              map={texture}
              ringColor="#FFD700"
              diamondColor="#B1A296"
              rotation={[-Math.PI / 2.6, 0, 0]}
              scale={3.4}
            />
          </Center>
        </Turntable>
      </Float>
    </>
  );
}

// Decorative, non-interactive hero render of the ring for the landing page.
export default function LandingRing() {
  return (
    <Canvas
      className="landing-ring-canvas"
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 15], fov: 42, near: 1, far: 40 }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
