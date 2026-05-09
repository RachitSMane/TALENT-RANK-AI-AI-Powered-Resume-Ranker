import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'TalentRank reduced our time-to-hire by 60%. The AI ranking is scarily accurate — it surfaced candidates we would have missed with manual screening.',
    name: 'Jennifer Walsh',
    title: 'VP of People at TechFlow',
  },
  {
    quote:
      'We process 500+ resumes per week. What used to take three recruiters two days now happens in 20 minutes. The ATS score matching is a game-changer.',
    name: 'Michael Torres',
    title: 'Head of Talent at DataSync',
  },
  {
    quote:
      'The keyword insights helped us rewrite our job descriptions and attract better-matched candidates. Our quality-of-hire metric improved by 35% in one quarter.',
    name: 'Aisha Patel',
    title: 'Talent Director at CloudBase',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    // Cards stagger
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

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
      ref={sectionRef}
      className="w-full py-20 lg:py-32"
      style={{ background: '#0D1220' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-4">
            {splitText('TESTIMONIALS')}
          </div>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#E2E8F0] leading-[1.2] tracking-[-0.02em]">
            <span className="block">{splitText('Loved by Hiring')}</span>
            <span className="block">{splitText('Teams Worldwide')}</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative rounded-2xl p-8"
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(0, 212, 255, 0.06)',
                opacity: 0,
              }}
            >
              <Quote
                size={24}
                className="text-[rgba(0,212,255,0.2)] mb-4"
              />
              <p className="text-base text-[#94A3B8] leading-[1.7] italic">
                "{t.quote}"
              </p>
              <div className="mt-5">
                <div className="text-sm font-semibold text-[#E2E8F0]">
                  {t.name}
                </div>
                <div className="text-[13px] text-[#64748B] mt-0.5">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
