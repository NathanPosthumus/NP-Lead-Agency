import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/nathanposthumus/30min';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** @type {(id: string) => void} */
  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-heading font-700 text-lg text-[#0F172A] tracking-tight">
                NP Lead Agency
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: 'Diensten', id: 'diensten' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Werkwijze', id: 'werkwijze' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-body text-sm font-medium text-[#0F172A]/70 hover:text-[#0F172A] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#F97316] text-white font-heading font-bold text-sm px-5 py-2.5 rounded-lg shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:bg-[#ea6c05] hover:shadow-[0_6px_24px_rgba(249,115,22,0.45)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Gratis Audit
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-[#0F172A]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu openen"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-[#E2E8F0] shadow-lg md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {[
                { label: 'Diensten', id: 'diensten' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Werkwijze', id: 'werkwijze' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left font-body text-base font-medium text-[#0F172A] py-2 border-b border-[#E2E8F0] last:border-0"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta justify-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Gratis Website-audit aanvragen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}