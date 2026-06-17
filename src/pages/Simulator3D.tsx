import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight, Environment, PresentationControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { RGBELoader } from 'three-stdlib';
import '../styles/Simulator3D.css';
import RingModel from '../components/ringModel';
import { RING_STYLES, styleName } from '../ringStyles';
import {
  setRingColor,
  setDiamondColor,
  setRingStyle,
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

const labelFor = (list: { name: string; hex: string }[], hex: string) =>
  list.find((i) => i.hex === hex)?.name ?? 'Custom';

interface SimulatorProps {
  onBack?: () => void;
}

function Simulator3D({ onBack }: SimulatorProps) {
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
      style: currentConfig.ringStyle,
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
    <div className="simulator">
      <Canvas className="sim-canvas" shadows camera={{ position: [0, 0, 15], fov: 55, near: 1, far: 30 }}>
        <color attach="background" args={['#0b0b0f']} />
        <ambientLight intensity={0.6} />
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
            <RingModel
              style={currentConfig.ringStyle}
              map={texture}
              ringColor={currentConfig.ringColor}
              diamondColor={currentConfig.diamondColor}
            />
            <AccumulativeShadows temporal frames={100} alphaTest={0.95} opacity={1} scale={20}>
              <RandomizedLight amount={8} radius={10} ambient={0.5} position={[0, 10, -2.5]} bias={0.001} size={3} />
            </AccumulativeShadows>
          </group>
        </PresentationControls>
        <EffectComposer>
          <Bloom luminanceThreshold={1} intensity={0.85} levels={9} mipmapBlur />
        </EffectComposer>
      </Canvas>

      {/* top bar */}
      <header className="sim-bar">
        <div className="sim-bar-left">
          {onBack && (
            <button className="ghost-btn" onClick={onBack}>
              <span aria-hidden="true">←</span> Back
            </button>
          )}
          <span className="brand sim-brand">AURUM</span>
        </div>
        <div className="sim-bar-right">
          <button className="ghost-btn" onClick={handleSave}>Save</button>
          <button className="solid-btn" onClick={handleShare}>Share design</button>
        </div>
      </header>

      {/* control panel */}
      <aside className="sim-panel">
        <fieldset className="picker">
          <legend>Setting</legend>
          <p className="picker-value">{styleName(currentConfig.ringStyle)}</p>
          <div className="style-options">
            {RING_STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`style-btn ${currentConfig.ringStyle === s.id ? 'active' : ''}`}
                aria-pressed={currentConfig.ringStyle === s.id}
                onClick={() => dispatch(setRingStyle(s.id))}>
                {s.name}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="picker">
          <legend>Metal</legend>
          <p className="picker-value">{labelFor(METALS, currentConfig.ringColor)}</p>
          <div className="chips">
            {METALS.map((m) => (
              <button
                key={m.hex}
                className={`chip ${currentConfig.ringColor === m.hex ? 'active' : ''}`}
                style={{ '--chip': m.hex } as React.CSSProperties}
                title={m.name}
                aria-label={m.name}
                aria-pressed={currentConfig.ringColor === m.hex}
                onClick={() => dispatch(setRingColor(m.hex))}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="picker">
          <legend>Gemstone</legend>
          <p className="picker-value">{labelFor(GEMSTONES, currentConfig.diamondColor)}</p>
          <div className="chips">
            {GEMSTONES.map((g) => (
              <button
                key={g.hex}
                className={`chip ${currentConfig.diamondColor === g.hex ? 'active' : ''}`}
                style={{ '--chip': g.hex } as React.CSSProperties}
                title={g.name}
                aria-label={g.name}
                aria-pressed={currentConfig.diamondColor === g.hex}
                onClick={() => dispatch(setDiamondColor(g.hex))}
              />
            ))}
          </div>
        </fieldset>
      </aside>

      <p className="sim-hint">Drag the ring to rotate</p>

      {savedConfigurations.length > 0 && (
        <div className="saved-strip">
          <span className="saved-label">Saved</span>
          {savedConfigurations.map((config, index) => (
            <div className="saved-swatch" key={`${config.ringColor}-${config.diamondColor}-${index}`}>
              <button
                className="swatch-apply"
                title="Apply this design"
                aria-label="Apply saved design"
                style={{ background: `linear-gradient(135deg, ${config.ringColor} 50%, ${config.diamondColor} 50%)` }}
                onClick={() => dispatch(applyConfiguration(config))}
              />
              <button className="swatch-remove" title="Remove" aria-label="Remove saved design" onClick={() => dispatch(removeConfiguration(index))}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {status && <div className="status-toast" role="status">{status}</div>}
    </div>
  );
}

export default Simulator3D;
