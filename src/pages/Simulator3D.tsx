import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { AccumulativeShadows, Html, RandomizedLight, Environment, Center, PresentationControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { RGBELoader } from 'three-stdlib';
import '../styles/Simulator3D.css';
import Ring from '../components/ring';
import {
  setRingColor,
  setDiamondColor,
  saveConfiguration,
  applyConfiguration,
  removeConfiguration,
} from '../redux/reducers/configurationReducer';
import { RootState } from '../redux/store';

const METALS = [
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Rose Gold', hex: '#ECC5C0' },
  { name: 'Silver', hex: '#C0C0C0' },
];

const GEMSTONES = [
  { name: 'Topaz', hex: '#FFC87C' },
  { name: 'Pink Sapphire', hex: '#FF007F' },
  { name: 'Diamond', hex: '#B1A296' },
  { name: 'Emerald', hex: '#50C878' },
  { name: 'Ruby', hex: '#880800' },
  { name: 'Amethyst', hex: '#5D478B' },
];

function Simulator3D() {
  const currentConfig = useSelector((state: RootState) => state.configurations.currentConfig);
  const savedConfigurations = useSelector((state: RootState) => state.configurations.savedConfigurations);
  const dispatch = useDispatch();

  const [status, setStatus] = useState<string | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((message: string) => {
    setStatus(message);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(null), 2000);
  }, []);

  useEffect(() => () => {
    if (statusTimer.current) clearTimeout(statusTimer.current);
  }, []);

  const texture = useLoader(RGBELoader, '/env.hdr');
  texture.mapping = THREE.EquirectangularReflectionMapping;

  const handleSave = () => {
    dispatch(saveConfiguration());
    flash('Configuration saved');
  };

  const handleShare = async () => {
    const params = new URLSearchParams({
      metal: currentConfig.ringColor.replace('#', ''),
      stone: currentConfig.diamondColor.replace('#', ''),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      flash('Share link copied to clipboard');
    } catch {
      flash('Copy failed — link is in the address bar');
      window.history.replaceState(null, '', url);
    }
  };

  return (
    <div className="simulator-container">
      <Canvas className="canvas-container" shadows camera={{ position: [0, 0, 15], fov: 55, near: 1, far: 30 }}>
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

        <Html position={[-2, -6, 0]} scale={0.15} className="material-container">
          <div className="material-btn">
            {METALS.map((m) => (
              <button
                key={m.hex}
                className={currentConfig.ringColor === m.hex ? 'active' : ''}
                onClick={() => dispatch(setRingColor(m.hex))}>
                {m.name}
              </button>
            ))}
          </div>
        </Html>
        <Html position={[-10, 2, 0]} className="gemstone-container">
          <div className="gemstone-btn">
            {GEMSTONES.map((g) => (
              <button
                key={g.hex}
                className={currentConfig.diamondColor === g.hex ? 'active' : ''}
                onClick={() => dispatch(setDiamondColor(g.hex))}>
                {g.name}
              </button>
            ))}
          </div>
        </Html>
      </Canvas>

      <div className="controls">
        <button onClick={handleSave}>Save Configuration</button>
        <button onClick={handleShare}>Copy Share Link</button>
      </div>

      {savedConfigurations.length > 0 && (
        <div className="saved-configs">
          {savedConfigurations.map((config, index) => (
            <div className="saved-swatch" key={`${config.ringColor}-${config.diamondColor}-${index}`}>
              <button
                className="swatch-apply"
                title="Apply this configuration"
                style={{ background: `linear-gradient(135deg, ${config.ringColor} 50%, ${config.diamondColor} 50%)` }}
                onClick={() => dispatch(applyConfiguration(config))}
              />
              <button className="swatch-remove" title="Remove" onClick={() => dispatch(removeConfiguration(index))}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {status && <div className="status-toast">{status}</div>}
    </div>
  );
}

export default Simulator3D;
