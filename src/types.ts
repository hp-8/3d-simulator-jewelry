// Types for the 3D ring configurator
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export interface GLTFResult extends GLTF {
  nodes: {
    ring: THREE.Mesh;
    diamonds: THREE.Mesh;
  };
  materials: {
    ring: THREE.MeshStandardMaterial;
    diamonds: THREE.MeshStandardMaterial;
  };
}

export interface RingProps {
  map: THREE.Texture;
  ringColor: string;
  diamondColor: string;
  [key: string]: any;
}

export interface Configuration {
  ringColor: string;
  diamondColor: string;
}
