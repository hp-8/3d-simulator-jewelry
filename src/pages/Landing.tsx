import { Suspense, lazy, useEffect, useState } from 'react';
import '../styles/Landing.css';

const LandingRing = lazy(() => import('../components/LandingRing'));

interface LandingProps {
  onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <main className={`landing ${mounted ? 'is-in' : ''}`}>
      <div className="landing-grain" aria-hidden="true" />
      <div className="landing-spot" aria-hidden="true" />

      {/* live product render, bleeding off the right edge */}
      <div className="landing-stage" aria-hidden="true">
        <Suspense fallback={<div className="landing-stage-glow" />}>
          <LandingRing />
        </Suspense>
      </div>

      <header className="landing-top">
        <span className="brand">AURUM</span>
        <button className="brand-enter" onClick={onEnter}>
          Open studio
        </button>
      </header>

      <section className="landing-hero">
        <h1>
          Shape it.<br />
          Set it. <span className="hero-soft">Turn it in the light.</span>
        </h1>
        <p className="lede">
          A real-time 3D studio for one-of-a-kind rings. Choose the setting, the metal,
          and the stone, then watch it catch the light from every angle.
        </p>

        <div className="landing-actions">
          <button className="cta" onClick={onEnter}>
            Start designing
            <span className="cta-arrow" aria-hidden="true">→</span>
          </button>
          <p className="landing-meta">6 settings · 3 metals · 6 gemstones</p>
        </div>
      </section>

      <footer className="landing-foot">
        <span>Drag to rotate</span>
        <span>Physically based refraction</span>
        <span>Built with WebGL</span>
      </footer>
    </main>
  );
}
