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

    // Heading blur reveal
    gsap.fromTo(
      headingRef.current?.querySelectorAll('.reveal-char') || [],
      { opacity: 0, filter: 'blur(8px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Content fade in
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const splitText = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="reveal-char inline-block"
        style={{ opacity: 0, whiteSpace: char === ' ' ? 'pre' : undefined }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="w-full py-20 lg:py-40"
      style={{ background: '#0A0E1A' }}
    >
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 text-center">
        <h2
          ref={headingRef}
          className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#E2E8F0] leading-[1.2] tracking-[-0.02em]"
        >
          <span className="block">{splitText('Ready to Transform')}</span>
          <span className="block">{splitText('Your Hiring Process?')}</span>
        </h2>

        <div ref={contentRef} style={{ opacity: 0 }}>
          <p className="mt-5 text-base text-[#64748B] max-w-[520px] mx-auto leading-relaxed">
            Join 2,000+ companies using TalentRank AI to find the best candidates
            faster. Start your free trial today.
          </p>

          <a
            href="#"
            className="inline-block mt-10 px-12 py-4 rounded-lg text-base font-semibold text-[#0A0E1A] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #00D4FF, #06B6D4)',
            }}
          >
            Get Started Free
          </a>

          <p className="mt-4 text-[13px] text-[#334155]">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
}
