import { Github, Twitter, Linkedin, BrainCircuit } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'API'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security'],
};

export default function Footer() {
  return (
    <footer
      className="w-full pt-16 pb-8"
      style={{
        background: '#0D1220',
        borderTop: '1px solid rgba(0, 212, 255, 0.06)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(34,211,238,0.12))',
                  border: '1px solid rgba(0,212,255,0.18)',
                }}
              >
                <BrainCircuit
                  size={20}
                  className="text-[#00D4FF]"
                />
              </div>

              <div className="flex items-center">
                <span className="text-[22px] font-black bg-gradient-to-r from-[#00D4FF] to-[#67E8F9] bg-clip-text text-transparent">
                  TalentRank
                </span>

                <span className="ml-1 text-[#94A3B8] text-[22px] font-light">
                  AI
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-[#64748B] leading-relaxed">
              AI-powered resume ranking platform for modern hiring teams.
            </p>

            <div
              className="mt-5 p-4 rounded-xl"
              style={{
                background: 'rgba(0,212,255,0.04)',
                border: '1px solid rgba(0,212,255,0.08)',
              }}
            >
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Powered by NLP, TF-IDF Vectorization,
                Cosine Similarity & Machine Learning.
              </p>
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-[#64748B] mb-4">
                {category}
              </h4>

              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#475569] hover:text-[#00D4FF] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderTop: '1px solid rgba(0, 212, 255, 0.06)',
          }}
        >
          <p className="text-[13px] text-[#334155]">
            © 2026 TalentRank AI. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-[#475569] hover:text-[#00D4FF] transition-colors duration-200"
            >
              <Github size={20} />
            </a>

            <a
              href="#"
              className="text-[#475569] hover:text-[#00D4FF] transition-colors duration-200"
            >
              <Twitter size={20} />
            </a>

            <a
              href="#"
              className="text-[#475569] hover:text-[#00D4FF] transition-colors duration-200"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}