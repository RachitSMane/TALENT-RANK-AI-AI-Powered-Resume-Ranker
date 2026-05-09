import { useEffect, useRef, useState } from 'react';
import { Menu, X, BrainCircuit } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Demo', href: '#demo' },
  { label: 'Pricing', href: '#cta' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -64, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
      }
    );
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
      style={{
        background: 'rgba(10, 14, 26, 0.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.08)',
        opacity: 0,
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="#"
          className="flex items-center gap-3 group"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,212,255,0.18), rgba(34,211,238,0.12))',
              border: '1px solid rgba(0,212,255,0.18)',
              boxShadow: '0 0 18px rgba(0,212,255,0.15)',
            }}
          >
            <BrainCircuit
              size={20}
              className="text-[#00D4FF]"
            />
          </div>

          <div className="flex items-center">
            <span className="text-[22px] font-black tracking-tight bg-gradient-to-r from-[#00D4FF] to-[#67E8F9] bg-clip-text text-transparent">
              TalentRank
            </span>

            <span className="ml-1 text-[#94A3B8] text-[22px] font-light">
              AI
            </span>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-[#94A3B8] hover:text-[#00D4FF] transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          onClick={(e) => handleNavClick(e, '#cta')}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0A0E1A] transition-all duration-300 hover:scale-105"
          style={{
            background:
              'linear-gradient(135deg, #00D4FF, #06B6D4)',
            boxShadow: '0 0 20px rgba(0,212,255,0.25)',
          }}
        >
          Get Started
        </a>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-[#E2E8F0]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          className="absolute top-16 left-0 right-0 md:hidden py-4 px-4"
          style={{
            background: 'rgba(10, 14, 26, 0.96)',
            backdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(0,212,255,0.08)',
          }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#94A3B8] hover:text-[#00D4FF] transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#cta"
              onClick={(e) => handleNavClick(e, '#cta')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-semibold text-[#0A0E1A] mt-2"
              style={{
                background:
                  'linear-gradient(135deg, #00D4FF, #06B6D4)',
              }}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}