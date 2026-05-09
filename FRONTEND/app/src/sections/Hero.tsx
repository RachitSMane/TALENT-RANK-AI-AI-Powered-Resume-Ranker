import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  ShieldCheck
} from 'lucide-react';

import DotGridCanvas from './DotGridCanvas';

export default function Hero() {

  const labelRef = useRef<HTMLDivElement>(null);

  const h1Ref = useRef<HTMLHeadingElement>(null);

  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const ctaRef = useRef<HTMLDivElement>(null);

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    tl.fromTo(
      labelRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
      }
    )

    .fromTo(
      h1Ref.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
      },
      '-=0.2'
    )

    .fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
      },
      '-=0.4'
    )

    .fromTo(
      ctaRef.current,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
      },
      '-=0.3'
    )

    .fromTo(
      statsRef.current?.children || [],
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.5,
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };

  }, []);

  return (

    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100vh',
      }}
    >

      {/* GRID */}
      <DotGridCanvas />

      {/* OVERLAY */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            `
            radial-gradient(
              ellipse at center,
              rgba(10,14,26,0.72) 0%,
              rgba(10,14,26,0.4) 50%,
              transparent 80%
            )
            `,
        }}
      />

      {/* GLOW */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,255,0.3), transparent)',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-[2] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 pb-20">

        {/* LABEL */}
        <div
          ref={labelRef}
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: 'rgba(0,212,255,0.06)',
            border: '1px solid rgba(0,212,255,0.12)',
            opacity: 0,
          }}
        >

          <Sparkles
            size={14}
            className="text-[#00D4FF]"
          />

          <span className="text-[#00D4FF] text-xs font-semibold tracking-[0.15em] uppercase">

            AI-POWERED HIRING INTELLIGENCE

          </span>

        </div>

        {/* HEADING */}
        <h1
          ref={h1Ref}
          className="max-w-[1100px] text-[42px] sm:text-[56px] lg:text-[84px] font-black text-[#F8FAFC] leading-[1.05] tracking-[-0.04em]"
          style={{
            textShadow:
              '0 0 40px rgba(0,212,255,0.12)',
            opacity: 0,
          }}
        >

          Hire Smarter.
          <br />

          <span className="bg-gradient-to-r from-[#00D4FF] to-[#67E8F9] bg-clip-text text-transparent">

            Rank Talent with AI.

          </span>

        </h1>

        {/* SUBTITLE */}
        <p
          ref={subtitleRef}
          className="mt-8 text-[16px] sm:text-[18px] text-[#94A3B8] max-w-[760px] leading-[1.9]"
          style={{
            opacity: 0,
          }}
        >

          TalentRank AI uses NLP, machine learning,
          and intelligent resume analysis to instantly
          rank candidates against your job descriptions —
          helping recruiters reduce screening time and
          hire the best talent faster.

        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          style={{
            opacity: 0,
          }}
        >

          <a
            href="#demo"

            onClick={(e) => {
              e.preventDefault();

              document
                .querySelector('#demo')
                ?.scrollIntoView({
                  behavior: 'smooth',
                });
            }}

            className="group px-8 py-4 rounded-xl text-sm font-semibold text-[#0A0E1A] transition-all duration-300 hover:scale-105"

            style={{
              background:
                'linear-gradient(135deg,#00D4FF,#06B6D4)',

              boxShadow:
                '0 0 24px rgba(0,212,255,0.3)',
            }}
          >

            <span className="flex items-center gap-2">

              Launch Live Demo

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </span>

          </a>

          <a
            href="#features"

            onClick={(e) => {
              e.preventDefault();

              document
                .querySelector('#features')
                ?.scrollIntoView({
                  behavior: 'smooth',
                });
            }}

            className="px-8 py-4 rounded-xl text-sm font-semibold text-[#00D4FF] border border-[rgba(0,212,255,0.2)] transition-all duration-300 hover:border-[#00D4FF] hover:bg-[rgba(0,212,255,0.05)]"
          >

            Explore Features

          </a>

        </div>

        {/* STATS */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20 w-full max-w-[900px]"
        >

          {[
            {
              icon: BrainCircuit,
              title: 'AI Ranking',
              value: '95%',
            },

            {
              icon: ShieldCheck,
              title: 'ATS Accuracy',
              value: '98%',
            },

            {
              icon: Sparkles,
              title: 'Screening Speed',
              value: '10x',
            },

          ].map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}

                className="rounded-2xl p-6 text-left"

                style={{
                  background:
                    'rgba(15,23,42,0.5)',

                  border:
                    '1px solid rgba(0,212,255,0.08)',

                  backdropFilter:
                    'blur(10px)',
                }}
              >

                <Icon
                  size={24}
                  className="text-[#00D4FF] mb-4"
                />

                <div className="text-3xl font-bold text-white">

                  {item.value}

                </div>

                <p className="mt-2 text-sm text-[#64748B]">

                  {item.title}

                </p>

              </div>

            );
          })}

        </div>

      </div>

    </section>
  );
}