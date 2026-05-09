import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!sectionRef.current) return;

    gsap.fromTo(
      headingRef.current?.querySelectorAll('.reveal-char') || [],
      {
        opacity: 0,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        },
      }
    );

    if (contentRef.current) {

      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

    }

  }, []);

  const splitText = (text: string) =>

    text.split('').map((char, index) => (

      <span
        key={index}
        className="reveal-char inline-block"
        style={{
          opacity: 0,
          whiteSpace: char === ' ' ? 'pre' : undefined,
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>

    ));

  return (

    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-10 overflow-hidden"
      style={{
        background: '#0A0E1A',
      }}
    >

      {/* BACKGROUND GLOW */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            `
            radial-gradient(
              circle at center,
              rgba(0,212,255,0.08),
              transparent 65%
            )
            `,
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center z-10">

        <div
          className="rounded-3xl border border-[rgba(0,212,255,0.12)] px-8 py-16 md:px-14"
          style={{
            background: 'rgba(15,23,42,0.65)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 40px rgba(0,212,255,0.06)',
          }}
        >

          <h2
            ref={headingRef}
            className="text-[34px] sm:text-[44px] lg:text-[56px] font-extrabold text-[#E2E8F0] leading-[1.1]"
          >

            <span className="block">
              {splitText('Ready to Transform')}
            </span>

            <span className="block text-[#00D4FF]">
              {splitText('Your Hiring Process?')}
            </span>

          </h2>

          <div
            ref={contentRef}
            style={{ opacity: 0 }}
          >

            <p className="mt-6 text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
              TalentRank AI helps recruiters screen resumes faster,
              identify top talent instantly, and improve hiring efficiency
              using intelligent AI-powered ranking.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">

              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#demo')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 rounded-xl text-base font-semibold text-black transition-all duration-300 hover:scale-105"
                style={{
                  background:
                    'linear-gradient(135deg, #00D4FF, #22D3EE)',
                  boxShadow:
                    '0 0 30px rgba(0,212,255,0.35)',
                }}
              >
                Try Live Demo
              </a>

              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#pricing')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 rounded-xl border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                View Pricing
              </a>

            </div>

            <p className="mt-5 text-sm text-[#475569]">
              No credit card required • AI-powered resume ranking • Downloadable reports
            </p>

          </div>

        </div>

      </div>

    </section>

  );
}