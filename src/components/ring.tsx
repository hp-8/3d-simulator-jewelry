import { useEffect } from 'react';
import { useGLTF, MeshRefractionMaterial, OrbitControls } from '@react-three/drei';
import '../styles/Simulator3D.css';
import { RingProps, GLTFResult } from '../types';

export default function Ring({ map, ringColor, diamondColor, ...props }: RingProps) {
  const { nodes, materials } = useGLTF('/ring-transformed.glb') as unknown as GLTFResult;

  useEffect(() => { 
    materials.ring.color.set(ringColor);
    materials.diamonds.color.set(diamondColor);
  }, [ringColor, diamondColor, materials.ring, materials.diamonds]);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.diamonds.geometry} material={nodes.diamonds.material} material-color={diamondColor}>

        <MeshRefractionMaterial envMap={map} aberrationStrength={0.02} toneMapped={false} />
      </mesh>

      <mesh castShadow receiveShadow geometry={nodes.ring.geometry} material={materials.ring} material-color={ringColor} material-envMapIntensity={4} />
      
    </group>
  );
}