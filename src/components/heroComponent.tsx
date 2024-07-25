// Import necessary modules
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Define your component
const HeroComponent: React.FC = () => {
  // Define state to hold the loaded model
  const [model, setModel] = React.useState<any>(null);

  // Load the model when the component mounts
  React.useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/om.glb', (gltf) => {
      setModel(gltf.scene);
    });
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {model && <primitive object={model} />}
    </Canvas>
  );
};

// Export the component
export default HeroComponent;
