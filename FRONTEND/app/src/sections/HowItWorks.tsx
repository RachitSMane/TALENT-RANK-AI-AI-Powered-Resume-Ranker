import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Paste Job Description',
    description:
      'Enter your job requirements, skills, and qualifications. Our AI analyzes the semantic structure of your description.',
  },
  {
    number: '02',
    title: 'Upload Resumes',
    description:
      'Drag and drop candidate resumes in bulk. We support PDF, DOCX, and text formats with automatic parsing.',
  },
  {
    number: '03',
    title: 'AI Processing',
    description:
      'Our engine extracts skills, calculates ATS scores, and runs NLP similarity analysis against your job description.',
  },
  {
    number: '04',
    title: 'Review Rankings',
    description:
      'Get a ranked shortlist with detailed breakdowns. Click any candidate to see their full skill match analysis.',
  },
];

export default function HowItWorks() {
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

    // Step cards stagger
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.15,
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
      id="how-it-works"
      ref={sectionRef}
      className="w-full py-20 lg:py-32"
      style={{ background: '#0D1220' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-4">
            {splitText('HOW IT WORKS')}
          </div>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#E2E8F0] leading-[1.2] tracking-[-0.02em]">
            <span className="block">{splitText('From Upload to')}</span>
            <span className="block">{splitText('Ranked Shortlist')}</span>
          </h2>
          <p className="mt-4 text-base text-[#64748B] max-w-[480px] mx-auto leading-relaxed">
            Four simple steps to transform your hiring process with AI.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(0, 212, 255, 0.06)',
                opacity: 0,
              }}
            >
              {/* Large step number */}
              <div
                className="absolute top-4 right-4 font-bold select-none pointer-events-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '48px',
                  color: 'rgba(0, 212, 255, 0.15)',
                }}
              >
                {step.number}
              </div>

              <div className="relative z-[1]">
                <div
                  className="text-xs font-semibold tracking-[0.1em] uppercase mb-4"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#00D4FF',
                  }}
                >
                  Step {step.number}
                </div>
                <h3 className="text-xl font-semibold text-[#E2E8F0] tracking-[-0.01em] mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] text-[#64748B] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
