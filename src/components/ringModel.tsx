import * as THREE from 'three';
import { Center } from '@react-three/drei';
import Ring from './ring';
import { PROCEDURAL } from './proceduralRings';

interface RingModelProps {
  style: string;
  map: THREE.Texture;
  ringColor: string;
  diamondColor: string;
}

// Routes the selected style to either the detailed GLB ("classic") or a
// procedural geometry. Each branch owns its own centering: the GLB is tuned
// for top-alignment, the procedural rings are centred on all axes so the
// gem-on-top styles stay framed in the middle of the canvas.
export default function RingModel({ style, map, ringColor, diamondColor }: RingModelProps) {
  const Proc = PROCEDURAL[style];

  if (!Proc) {
    return (
      <Center top>
        <Ring
          map={map}
          ringColor={ringColor}
          diamondColor={diamondColor}
          rotation={[-Math.PI / 2.05, 0, 0]}
          scale={3}
        />
      </Center>
    );
  }

  return (
    <Center>
      <group scale={2.4} rotation={[0.15, 0, 0]}>
        <Proc ringColor={ringColor} diamondColor={diamondColor} />
      </group>
    </Center>
  );
}
