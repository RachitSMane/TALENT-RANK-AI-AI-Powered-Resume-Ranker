import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const companies = ['TechFlow', 'DataSync', 'CloudBase', 'NexGen', 'Velocity', 'QuantumLabs'];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });

    logosRef.current.forEach((logo, i) => {
      if (logo) {
        tl.fromTo(
          logo,
          { opacity: 0, y: 10 },
          { opacity: 0.4, y: 0, duration: 0.5, ease: 'power2.out' },
          0.1 + i * 0.08
        );
      }
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full py-10"
      style={{
        background: 'rgba(13, 18, 32, 0.5)',
        borderTop: '1px solid rgba(0, 212, 255, 0.05)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.05)',
      }}
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div
          ref={labelRef}
          className="text-center text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-6"
          style={{ opacity: 0 }}
        >
          Trusted by hiring teams at
        </div>
        <div className="flex flex-wrap justify-around items-center gap-6 sm:gap-8">
          {companies.map((name, i) => (
            <div
              key={name}
              ref={(el) => { logosRef.current[i] = el; }}
              className="text-[#475569] hover:text-[#94A3B8] transition-opacity duration-300 text-sm sm:text-base font-semibold tracking-wide uppercase cursor-default select-none"
              style={{ opacity: 0 }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
