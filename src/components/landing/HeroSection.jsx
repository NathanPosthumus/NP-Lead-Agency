import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/nathanposthumus/30min';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F8FAFC]">
      {/* Background grid decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0F172A]/[0.03] via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen lg:min-h-0 lg:py-32">
          
          {/* Left: Text */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 rounded-full px-4 py-1.5 text-sm font-medium font-body w-fit"
            >
              <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
              Exclusief voor dakdekkersbedrijven
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-heading font-bold text-[#0F172A] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
            >
              Meer dakdekkers{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#F97316]">klanten</span>
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6C40 2 80 1 100 2C120 3 160 5 198 3"
                    stroke="#F97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              via uw website
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="font-body text-[#0F172A]/65 text-lg lg:text-xl leading-relaxed max-w-xl"
            >
              De meeste dakdekkerwebsites kosten u dagelijks klanten — zonder dat u het merkt. 
              Wij bouwen websites die wél converteren: meer offerte-aanvragen, meer telefoontjes, 
              meer lokale opdrachten.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta text-base lg:text-lg px-7 py-4 lg:py-5 w-full sm:w-auto justify-center"
              >
                Vraag een gratis website-audit aan
                <ArrowRight className="w-5 h-5" />
              </a>
              <button
                onClick={scrollToPortfolio}
                className="btn-secondary text-sm w-full sm:w-auto justify-center"
              >
                Bekijk onze voorbeelden
              </button>
            </motion.div>

            {/* Social proof mini */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex -space-x-2">
                {['bg-[#2563EB]', 'bg-[#F97316]', 'bg-[#0F172A]'].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {['JB', 'MV', 'PD'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#0F172A]/55 font-body">
                <span className="font-semibold text-[#0F172A]">14+ dakdekkers</span> gingen u voor
              </p>
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(15,23,42,0.18)]">
              <img
                src="/images/landingPageImage1.jpg"
                alt="Premium dakwerk - NP Lead Agency"
                className="w-full h-[560px] object-cover"
                style={{ animation: 'ken-burns 10s ease-in-out infinite alternate' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/30 via-transparent to-transparent" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-xl"
              >
                <p className="font-heading font-bold text-2xl text-[#F97316]">+68%</p>
                <p className="font-body text-sm text-[#0F172A]/70 mt-0.5">meer offerte-aanvragen</p>
                <p className="font-body text-xs text-[#0F172A]/40 mt-1">gemiddeld na 3 maanden</p>
              </motion.div>

              {/* Tech badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute top-6 right-6 bg-[#0F172A] text-white rounded-xl p-3 shadow-xl"
              >
                <p className="font-body text-xs font-medium">Lokale Google #1</p>
                <p className="font-heading font-bold text-sm mt-0.5">Geoptimaliseerd</p>
              </motion.div>
            </div>

            {/* Decorative line */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-0.5 h-32 bg-gradient-to-b from-transparent via-[#F97316] to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0F172A]/30"
      >
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}