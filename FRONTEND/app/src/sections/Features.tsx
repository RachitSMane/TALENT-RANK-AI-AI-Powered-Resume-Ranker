import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, BarChart3, TrendingUp, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: FileText,
    title: 'AI Resume Parsing',
    description:
      'Extract structured data from any resume format — PDF, DOCX, or plain text. Our NLP engine identifies skills, experience, education, and contact details automatically.',
  },
  {
    icon: BarChart3,
    title: 'ATS Score Matching',
    description:
      'Compare every resume against your job description and receive a precise compatibility score from 0-100. No more gut-feeling decisions.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Ranking',
    description:
      'Candidates are ranked by composite AI scores using weighted factors: keyword match, experience relevance, skill depth, and semantic similarity.',
  },
  {
    icon: Search,
    title: 'Keyword Insights',
    description:
      'See exactly which keywords matched, which were missing, and get actionable suggestions to refine your job descriptions for better candidate alignment.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heading animation
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

    // Cards animation
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
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

  // Split text into characters for blur reveal
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="reveal-char inline-block"
        style={{ opacity: 0, whiteSpace: char === ' ' ? 'pre' : undefined }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-40"
      style={{ background: '#0A0E1A' }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at var(--bg-x, 20%) var(--bg-y, 20%), rgba(0, 212, 255, 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-4">
            {splitText('FEATURES')}
          </div>
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#E2E8F0] leading-[1.2] tracking-[-0.02em]">
            <span className="block">{splitText('Everything Your Hiring')}</span>
            <span className="block">{splitText('Team Needs')}</span>
          </h2>
          <p className="mt-4 text-base text-[#64748B] max-w-[560px] mx-auto leading-relaxed">
            From resume parsing to AI-powered ranking — a complete toolkit for
            modern recruitment.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:border-[rgba(0,212,255,0.2)]"
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 212, 255, 0.08)',
                  opacity: 0,
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: 'rgba(0, 212, 255, 0.08)',
                    border: '1px solid rgba(0, 212, 255, 0.15)',
                  }}
                >
                  <Icon size={28} className="text-[#00D4FF]" />
                </div>

                <h3 className="text-xl font-semibold text-[#E2E8F0] tracking-[-0.01em] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
