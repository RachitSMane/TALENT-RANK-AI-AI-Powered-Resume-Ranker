import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import TrustedBy from './sections/TrustedBy';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import LiveDemo from './sections/LiveDemo';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {

    // LENIS SMOOTH SCROLL
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.08,
    });

    lenisRef.current = lenis;

    // CONNECT GSAP + LENIS
    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    // GLOBAL BG ANIMATION
    gsap.to('body', {
      backgroundPosition: '200% 200%',
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };

  }, []);

  return (

    <div
      className="overflow-x-hidden text-white"
      style={{
        background:
          `
          radial-gradient(
            circle at top left,
            rgba(0,212,255,0.08),
            transparent 30%
          ),
          radial-gradient(
            circle at bottom right,
            rgba(34,211,238,0.06),
            transparent 30%
          ),
          #0A0E1A
          `,
        backgroundSize: '200% 200%',
        minHeight: '100vh',
      }}
    >

      {/* NAVBAR */}
      <Navigation />

      {/* MAIN CONTENT */}
      <main className="relative z-10">

        <Hero />

        <div className="relative">

          {/* BACKGROUND GLOW */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                `
                radial-gradient(
                  circle at center,
                  rgba(0,212,255,0.04),
                  transparent 70%
                )
                `,
            }}
          />

          <TrustedBy />

          <Features />

          <HowItWorks />

          <LiveDemo />

          <Testimonials />

          <CTA />

        </div>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App;