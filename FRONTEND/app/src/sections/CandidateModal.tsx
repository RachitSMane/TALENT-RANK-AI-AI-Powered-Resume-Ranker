import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Sparkles, Trophy, Brain } from 'lucide-react';

interface Candidate {
  name: string;
  score: number;
  insight: string;
  keywords: string[];
  badge: string;
  rank: number;
}

interface CandidateModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export default function CandidateModal({
  candidate,
  onClose,
}: CandidateModalProps) {

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    gsap.fromTo(
      modalRef.current,
      {
        scale: 0.9,
        opacity: 0,
        y: 40,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      }
    );

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };

  }, []);

  const handleClose = () => {

    gsap.to(modalRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.25,
    });

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose,
    });

  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* BACKDROP */}
      <div
        ref={backdropRef}
        className="absolute inset-0"
        style={{
          background: 'rgba(10,14,26,0.85)',
          backdropFilter: 'blur(10px)',
        }}
        onClick={handleClose}
      />

      {/* MODAL */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[720px] rounded-[24px] overflow-hidden"
        style={{
          background: '#0F172A',
          border: '1px solid rgba(0,212,255,0.12)',
          boxShadow: '0 0 60px rgba(0,212,255,0.12)',
        }}
      >

        {/* TOP GLOW */}
        <div
          className="absolute top-0 left-0 right-0 h-[120px]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,212,255,0.12), transparent)',
          }}
        />

        {/* CONTENT */}
        <div className="relative p-8">

          {/* CLOSE */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-[#64748B] hover:text-white transition"
          >
            <X size={24} />
          </button>

          {/* HEADER */}
          <div className="flex items-center justify-between">

            <div>
              <div className="flex items-center gap-3">

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold"
                  style={{
                    background:
                      'linear-gradient(135deg,#00D4FF,#06B6D4)',
                    color: '#0A0E1A',
                  }}
                >
                  {candidate.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {candidate.name}
                  </h2>

                  <p className="text-[#64748B] mt-1">
                    AI Ranked Candidate
                  </p>
                </div>

              </div>
            </div>

            <div
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.15)',
                color: '#22D3EE',
              }}
            >
              #{candidate.rank}
            </div>

          </div>

          {/* BADGE */}
          <div className="mt-6 flex items-center gap-2">

            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >
              <Trophy size={18} color="#22C55E" />

              <span className="text-[#22C55E] font-medium text-sm">
                {candidate.badge}
              </span>
            </div>

          </div>

          {/* SCORE */}
          <div className="mt-8">

            <div className="flex justify-between items-center mb-3">
              <span className="text-[#94A3B8]">
                Overall Match Score
              </span>

              <span
                className="text-4xl font-bold text-[#00D4FF]"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {candidate.score}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${candidate.score}%`,
                  background:
                    'linear-gradient(90deg,#00D4FF,#22D3EE)',
                }}
              />
            </div>

          </div>

          {/* AI INSIGHT */}
          <div className="mt-10">

            <div className="flex items-center gap-2 mb-4">
              <Brain size={18} color="#22D3EE" />

              <h3 className="text-lg font-semibold text-white">
                AI Insight
              </h3>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(0,212,255,0.05)',
                border: '1px solid rgba(0,212,255,0.1)',
              }}
            >
              <p className="text-[#CBD5E1] leading-7">
                {candidate.insight}
              </p>
            </div>

          </div>

          {/* KEYWORDS */}
          <div className="mt-10">

            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} color="#22D3EE" />

              <h3 className="text-lg font-semibold text-white">
                Matched Keywords
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">

              {candidate.keywords.map((keyword) => (

                <div
                  key={keyword}
                  className="px-4 py-2 rounded-xl text-sm"
                  style={{
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.15)',
                    color: '#4ADE80',
                  }}
                >
                  ✓ {keyword}
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}