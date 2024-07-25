import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { AccumulativeShadows, Html, RandomizedLight, Environment, Center, PresentationControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { RGBELoader } from 'three-stdlib';
import '../styles/Simulator3D.css';
import Ring from '../components/ring';
import { setRingColor, setDiamondColor, saveConfiguration } from '../redux/reducers/configurationReducer';
import { addToCart } from '../redux/reducers/cartReducer';
import { RootState } from '../redux/store';
import { CartItem } from '../types';

// Define the Partial<Configuration> type
type PartialConfiguration = Partial<{
  ringColor: string;
  diamondColor: string;
}>;

// Define the convertToCartItem function
const convertToCartItem = (config: PartialConfiguration): CartItem => {
  const cartItem: CartItem = {
    _id: '', // Provide a unique id for the cart item
    category: '', // Provide the category for the product
    name: 'Customized Ring', // You can set a default name or adjust it as needed
    description: 'Customized ring with specified colors',
    price: 0, // You can set a default price or adjust it as needed
    imageURL: '', // Provide an image URL for the product
    quantity: 1, // Set the default quantity to 1
    // You may also include other properties from Configuration if needed
  };
  console.log('Converted Configuration to CartItem:', cartItem);
  return cartItem;
};

function Simulator3D() {
  const currentConfig = useSelector((state: RootState) => state.configurations.currentConfig);
  const savedConfigurations = useSelector((state: RootState) => state.configurations.savedConfigurations);
  const dispatch = useDispatch();

  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr');
  texture.mapping = THREE.EquirectangularReflectionMapping;

  console.log('Current Configuration:', currentConfig);
  console.log('Saved Configurations:', savedConfigurations);

  const handleRingColorChange = (newColor: string) => {
    console.log('Ring Color Change:', newColor);
    dispatch(setRingColor(newColor));
  };

  const handleDiamondColorChange = (newColor: string) => {
    console.log('Diamond Color Change:', newColor);
    dispatch(setDiamondColor(newColor));
  };

  const handleSaveConfiguration = () => {
    console.log('Saving Configuration:', currentConfig);
    dispatch(saveConfiguration());
    alert('Configuration saved!');
  };

  const handleAddToCart = () => {
    const cartItem = convertToCartItem(currentConfig);
    console.log('Adding to Cart:', cartItem);
    dispatch(addToCart(cartItem));
    alert('Added to cart!');
  };

  return (
    <div className="simulator-container">
      <Canvas className='canvas-container' shadows camera={{ position: [0, 0, 15], fov: 55, near: 1, far: 30 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight />
        <Environment map={texture} />
        <PresentationControls
          global
          config={{ mass: 1, tension: 250, friction: 20 }}
          snap={false}
          zoom={1.25}
          rotation={[0.5, 0.5, 0]}
          polar={[-Infinity, Infinity]}
          azimuth={[-Infinity, Infinity]}>
          <group position={[0, -3, 0]}>
            <Center top>
              <Ring className="ring-container" map={texture} ringColor={currentConfig.ringColor} diamondColor={currentConfig.diamondColor} rotation={[-Math.PI / 2.05, 0, 0]} scale={3} />
            </Center>
            <AccumulativeShadows temporal frames={100} alphaTest={0.95} opacity={1} scale={20}>
              <RandomizedLight amount={8} radius={10} ambient={0.5} position={[0, 10, -2.5]} bias={0.001} size={3} />
            </AccumulativeShadows>
          </group>
        </PresentationControls>
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
        </EffectComposer>

        <Html position={[-2, -6, 0]} scale={0.15} className='material-container'>
          <div className="material-btn">
            <button onClick={() => handleRingColorChange('#FFD700')}>Gold</button>
            <button onClick={() => handleRingColorChange('#ECC5C0')}>Rose Gold</button>
            <button onClick={() => handleRingColorChange('#C0C0C0')}>Silver</button>
          </div>
        </Html>
        <Html position={[-10, 2, 0]} className='gemstone-container'>
          <div className="gemstone-btn">
            <button onClick={() => handleDiamondColorChange('#FFC87C')}>Topaz</button>
            <button onClick={() => handleDiamondColorChange('#FF007F')}>Pink Sapphire</button>
            <button onClick={() => handleDiamondColorChange('#B1A296')}>Diamond</button>
            <button onClick={() => handleDiamondColorChange('#50C878')}>Emerald</button>
            <button onClick={() => handleDiamondColorChange('#880800')}>Ruby</button>
            <button onClick={() => handleDiamondColorChange('#5D478B')}>Amethyst</button>
          </div>
        </Html>
    
      
      </Canvas>
      <div className="controls">
        <button onClick={handleSaveConfiguration}>Save Configuration</button>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  
    
  )
}

export default Simulator3D;
