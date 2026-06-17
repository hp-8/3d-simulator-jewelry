import { useEffect, useState } from 'react';
import '../styles/Landing.css';

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
      <div className="landing-bloom" aria-hidden="true" />

      <header className="landing-top">
        <span className="brand">AURUM</span>
        <span className="brand-sub">Fine Jewelry · Made to Order</span>
      </header>

      <section className="landing-hero">
        <p className="eyebrow">The Bespoke Atelier</p>
        <h1>
          Design a ring that is
          <em> unmistakably yours.</em>
        </h1>
        <p className="lede">
          Sculpt the metal, set the stone, and turn it in real time under studio light —
          then save the design or share it with a single link.
        </p>

        <div className="landing-actions">
          <button className="cta" onClick={onEnter}>
            Open the configurator
            <span className="cta-arrow" aria-hidden="true">→</span>
          </button>
          <ul className="landing-specs">
            <li><strong>3</strong> metals</li>
            <li><strong>6</strong> gemstones</li>
            <li>real-time 3D</li>
          </ul>
        </div>
      </section>

      <footer className="landing-foot">
        <span>Drag to rotate · physically based refraction · WebGL</span>
      </footer>
    </main>
  );
}
