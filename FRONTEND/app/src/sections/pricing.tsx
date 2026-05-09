import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for students and small hiring teams.',
    features: [
      'Upload up to 10 resumes',
      'AI ranking system',
      'Keyword matching',
      'PDF resume support',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$29/mo',
    description: 'Best for recruiters and growing companies.',
    features: [
      'Unlimited resume uploads',
      'Advanced AI ranking',
      'Candidate insights',
      'Downloadable reports',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Advanced hiring intelligence for enterprises.',
    features: [
      'Custom integrations',
      'Team collaboration',
      'Analytics dashboard',
      'Cloud deployment',
      'Dedicated support',
    ],
    highlighted: false,
  },
];

export default function Pricing() {

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!sectionRef.current) return;

    gsap.fromTo(
      '.pricing-card',
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

  }, []);

  return (

    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-10"
      style={{
        background: '#0A0E1A',
      }}
    >

      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">

          <p className="text-[#00D4FF] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Pricing
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#E2E8F0]">
            Simple Pricing for Every Team
          </h2>

          <p className="mt-5 text-[#64748B] max-w-2xl mx-auto text-lg">
            Choose the perfect plan to streamline your hiring process with AI-powered resume ranking.
          </p>

        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {pricingPlans.map((plan, index) => (

            <div
              key={index}
              className={`pricing-card relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? 'border-cyan-400 shadow-[0_0_35px_rgba(0,212,255,0.18)]'
                  : 'border-[rgba(255,255,255,0.08)]'
              }`}
              style={{
                background: 'rgba(15,23,42,0.7)',
                backdropFilter: 'blur(12px)',
              }}
            >

              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-cyan-400 text-black">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold text-[#E2E8F0]">
                {plan.name}
              </h3>

              <div className="mt-4 text-4xl font-extrabold text-[#00D4FF]">
                {plan.price}
              </div>

              <p className="mt-4 text-[#64748B] leading-relaxed">
                {plan.description}
              </p>

              <div className="mt-8 space-y-4">

                {plan.features.map((feature, idx) => (

                  <div
                    key={idx}
                    className="flex items-center gap-3 text-[#CBD5E1]"
                  >

                    <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center">
                      <Check size={14} className="text-cyan-400" />
                    </div>

                    <span>{feature}</span>

                  </div>

                ))}

              </div>

              <button
                className={`mt-10 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                    : 'border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
                }`}
              >
                Get Started
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}