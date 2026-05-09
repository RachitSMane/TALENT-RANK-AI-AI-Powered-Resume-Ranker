import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Upload,
  TrendingUp,
  Trophy,
  CheckCircle2,
  Download
} from 'lucide-react';

import CandidateModal from './CandidateModal';
import { rankCandidates } from '../lib/api';

gsap.registerPlugin(ScrollTrigger);

interface CandidateData {
  name: string;
  role: string;
  matchScore: number;
  atsScore: number;
  keywordMatch: number;
  skills: { name: string; score: number }[];
  tags: string[];
  insight: string;
  keywords: string[];
  initial: string;
  isTopMatch?: boolean;
}

export default function LiveDemo() {

  const sectionRef = useRef<HTMLDivElement>(null);

  const leftRef = useRef<HTMLDivElement>(null);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedCandidate,
    setSelectedCandidate] =
    useState<CandidateData | null>(null);

  const [jobDescription,
    setJobDescription] =
    useState('');

  const [uploadedFiles,
    setUploadedFiles] =
    useState<File[]>([]);

  const [candidates,
    setCandidates] =
    useState<CandidateData[]>([]);

  const [loading,
    setLoading] =
    useState(false);

  const [successMessage,
    setSuccessMessage] =
    useState('');

  useEffect(() => {

    if (!sectionRef.current) return;

    const leftEls =
      leftRef.current?.querySelectorAll('.anim-left');

    if (leftEls) {

      gsap.fromTo(
        leftEls,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions:
              'play none none none',
          },
        }
      );
    }

    cardsRef.current.forEach((card, i) => {

      if (!card || !candidates[i]) return;

      const isTop =
        candidates[i].isTopMatch;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: isTop
            ? 'power2.out'
            : 'power3.out',

          delay: isTop
            ? 0.3
            : i * 0.1,

          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions:
              'play none none none',
          },
        }
      );
    });

    const progressBars =
      sectionRef.current?.querySelectorAll(
        '.progress-fill'
      );

    if (progressBars) {

      progressBars.forEach((bar, i) => {

        if (!candidates[i]) return;

        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width:
              `${candidates[i].matchScore}%`,

            duration: 1.2,

            ease: 'power3.out',

            delay: 0.8 + i * 0.15,

            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions:
                'play none none none',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll()
        .forEach((t) => t.kill());
    };

  }, [candidates]);

  const downloadCSVReport = () => {

    if (candidates.length === 0) {
      alert('No candidates available');
      return;
    }

    const headers = [
      'Rank',
      'Candidate Name',
      'Match Score',
      'Keywords',
      'Insight'
    ];

    const rows = candidates.map((candidate, index) => [
      index + 1,
      candidate.name,
      `${candidate.matchScore}%`,
      candidate.keywords.join(', '),
      candidate.insight
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(','))
    ].join('\n');

    const blob = new Blob(
      [csvContent],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;

    link.setAttribute(
      'download',
      'TalentRank_AI_Report.csv'
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (

    <section
      id="demo"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-40"
      style={{
        background: '#0A0E1A'
      }}
    >

      <div
        className="absolute inset-0 pointer-events-none"

        style={{
          background:
            'radial-gradient(ellipse 80% 60% at var(--bg-x, 20%) var(--bg-y, 20%), rgba(0, 212, 255, 0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* LEFT */}
          <div
            ref={leftRef}
            className="w-full lg:w-[55%] flex-shrink-0"
          >

            <div className="anim-left text-xs font-semibold tracking-[0.15em] uppercase text-[#00D4FF] mb-4">

              LIVE DEMO

            </div>

            <h2 className="anim-left text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-[#E2E8F0] leading-[1.2] tracking-[-0.02em]">

              See AI Ranking
              <br />
              in Action

            </h2>

            <p className="anim-left mt-4 text-base text-[#64748B] max-w-[480px] leading-relaxed">

              Paste a job description and upload resumes to watch our AI rank candidates in real-time.

            </p>

            {/* TEXTAREA */}
            <div className="anim-left mt-8">

              <textarea
                value={jobDescription}

                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }

                placeholder="Paste your job description here..."

                className="w-full min-h-[160px] rounded-xl p-5 text-sm text-[#E2E8F0] placeholder-[#334155] resize-none outline-none transition-all duration-200 focus:border-[#00D4FF]"

                style={{
                  background:
                    'rgba(15, 23, 42, 0.6)',

                  border:
                    '1px solid rgba(0, 212, 255, 0.12)',
                }}
              />

            </div>

            {/* UPLOAD */}
            <div
              className="anim-left mt-4 rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-[#00D4FF]"

              style={{
                border:
                  '2px dashed rgba(0, 212, 255, 0.2)',

                background:
                  'rgba(15, 23, 42, 0.3)',
              }}

              onClick={() => {
                document
                  .getElementById(
                    'resume-upload'
                  )
                  ?.click();
              }}
            >

              <input
                type="file"
                multiple
                accept=".pdf"
                className="hidden"
                id="resume-upload"

                onChange={(e) => {

                  if (e.target.files) {

                    setUploadedFiles(
                      Array.from(
                        e.target.files
                      )
                    );
                  }
                }}
              />

              <Upload
                size={32}
                className="text-[#00D4FF] mx-auto mb-3"
              />

              <p className="text-sm text-[#64748B]">

                Drag & drop resumes or click to upload

              </p>

              <p className="text-xs text-[#334155] mt-1">

                Supports PDF

              </p>

              {uploadedFiles.length > 0 && (

                <p className="text-cyan-400 mt-2 text-sm">

                  {uploadedFiles.length}
                  {' '}
                  file(s) selected

                </p>

              )}

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">

              <button

                onClick={async () => {

                  try {

                    if (
                      !jobDescription ||
                      uploadedFiles.length === 0
                    ) {

                      alert(
                        'Please upload resumes and add a job description'
                      );

                      return;
                    }

                    setLoading(true);

                    const data =
                      await rankCandidates(
                        jobDescription,
                        uploadedFiles
                      );

                    const transformed =
                      data.results.map(
                        (
                          candidate: any,
                          index: number
                        ) => ({

                          name:
                            candidate.name,

                          role:
                            'AI Ranked Candidate',

                          matchScore:
                            candidate.score,

                          atsScore:
                            candidate.score,

                          keywordMatch:
                            candidate.score,

                          skills: [],

                          tags: [
                            'AI Ranked',
                            'ATS Compatible',
                          ],

                          insight:
                            candidate.score > 80
                              ? 'Excellent alignment with job description.'
                              : candidate.score > 60
                              ? 'Strong candidate with relevant skills.'
                              : 'Partial match based on keywords.',

                          keywords:
                            candidate.keywords || [
                              'React',
                              'TypeScript',
                              'Node.js',
                              'REST APIs',
                            ],

                          initial:
                            candidate.name[0],

                          isTopMatch:
                            index === 0,
                        })
                      );

                    setCandidates(
                      transformed
                    );

                    setSuccessMessage(
                      `${transformed.length} candidates ranked successfully`
                    );

                  } catch (error) {

                    console.error(error);

                    alert(
                      'Failed to rank candidates'
                    );

                  } finally {

                    setLoading(false);
                  }
                }}

                className="anim-left flex-1 py-3.5 rounded-lg text-sm font-semibold text-[#0A0E1A] transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,212,255,0.4)]"

                style={{
                  background:
                    'linear-gradient(135deg, #00D4FF, #06B6D4)',
                }}
              >

                {loading ? 'Ranking Candidates...' : 'Rank Candidates'}

              </button>

              <button

                onClick={downloadCSVReport}

                className="anim-left flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-sm font-semibold text-[#00D4FF] border border-cyan-500/20 hover:border-cyan-400 transition-all"

                style={{
                  background:
                    'rgba(15,23,42,0.6)',
                }}
              >

                <Download size={16} />

                Download Report

              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4">

            {successMessage && (

              <div
                className="mb-4 p-4 rounded-xl flex items-center gap-2 text-sm"

                style={{
                  background:
                    'rgba(34,197,94,0.08)',

                  border:
                    '1px solid rgba(34,197,94,0.15)',

                  color: '#4ADE80',
                }}
              >

                <CheckCircle2 size={18} />

                {successMessage}

              </div>

            )}

            {candidates.length === 0 ? (

              <div
                className="rounded-2xl p-8 text-center"

                style={{
                  background:
                    'rgba(15, 23, 42, 0.5)',

                  border:
                    '1px solid rgba(0, 212, 255, 0.08)',
                }}
              >

                <p className="text-[#64748B]">

                  No ranked candidates yet

                </p>

              </div>

            ) : (

              candidates.map((candidate, i) => (

                <div
                  key={candidate.name}

                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}

                  className="rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-300"

                  style={{
                    background:
                      candidate.isTopMatch
                        ? 'rgba(15, 23, 42, 0.7)'
                        : 'rgba(15, 23, 42, 0.5)',

                    border:
                      candidate.isTopMatch
                        ? '1px solid rgba(0, 212, 255, 0.3)'
                        : '1px solid rgba(0, 212, 255, 0.08)',
                  }}

                  onClick={() =>
                    setSelectedCandidate(
                      candidate
                    )
                  }
                >

                  {candidate.isTopMatch && (

                    <div
                      className="inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded mb-3"

                      style={{
                        background:
                          'rgba(0, 212, 255, 0.15)',

                        color:
                          '#00D4FF',
                      }}
                    >

                      <Trophy size={12} />

                      BEST FIT

                    </div>

                  )}

                  <h3 className="text-lg font-semibold text-[#E2E8F0]">

                    {candidate.name}

                  </h3>

                  <p className="text-sm text-[#64748B]">

                    {candidate.role}

                  </p>

                  <div className="flex items-center justify-between mt-4">

                    <span
                      className="text-xs text-[#64748B] uppercase tracking-wide"
                    >

                      Match Score

                    </span>

                    <div className="flex items-center gap-1">

                      <span
                        className="text-2xl font-bold text-[#00D4FF]"
                      >

                        {candidate.matchScore}%

                      </span>

                      <TrendingUp
                        size={16}
                        className="text-[#00D4FF]"
                      />

                    </div>

                  </div>

                  <div
                    className="h-1.5 rounded-full mt-2"

                    style={{
                      background:
                        'rgba(0, 212, 255, 0.1)',
                    }}
                  >

                    <div
                      className="progress-fill h-full rounded-full"

                      style={{
                        width: '0%',

                        background:
                          'linear-gradient(90deg, #00D4FF, #22D3EE)',
                      }}
                    />

                  </div>

                  <div className="mt-4">

                    <p className="text-xs uppercase tracking-wide text-[#64748B] mb-2">

                      Matched Keywords

                    </p>

                    <div className="flex flex-wrap gap-2">

                      {candidate.keywords.map(
                        (keyword) => (

                          <span
                            key={keyword}

                            className="text-xs px-2.5 py-1 rounded-md"

                            style={{
                              background:
                                'rgba(34,197,94,0.1)',

                              border:
                                '1px solid rgba(34,197,94,0.15)',

                              color:
                                '#4ADE80',
                            }}
                          >

                            ✔ {keyword}

                          </span>
                        )
                      )}

                    </div>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

      {selectedCandidate && (

        <CandidateModal
          candidate={selectedCandidate}

          onClose={() =>
            setSelectedCandidate(null)
          }
        />
      )}

    </section>
  );
}