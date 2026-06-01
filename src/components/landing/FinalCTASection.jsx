import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/nathanposthumus/30min';

const guarantees = [
  'Volledig gratis, geen verplichtingen',
  'Binnen 48 uur een persoonlijk advies',
  'Concreet actieplan voor meer leads',
];

export default function FinalCTASection() {
  return (
    <section className="section-padding bg-[#0F172A] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30 rounded-full px-4 py-1.5 text-sm font-medium font-body mb-8">
            <Clock className="w-4 h-4" />
            Beperkt aantal plaatsen beschikbaar per maand
          </div>

          <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-6xl leading-[1.1] mb-6">
            Klaar om{' '}
            <span className="text-[#F97316]">meer opdrachten</span>{' '}
            te krijgen via uw website?
          </h2>

          <p className="font-body text-white/65 text-lg lg:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
            Laat ons uw website gratis analyseren. We laten u precies zien wat u misloopt en hoe we dat oplossen — zonder verplichtingen.
          </p>

          <p className="font-body text-white/40 text-sm mb-10">
            Elke maand werken wij met een select aantal dakdekkers. Vol = vol.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block mb-8"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#F97316] text-white font-heading font-bold text-lg lg:text-xl px-8 lg:px-12 py-5 lg:py-6 rounded-xl shadow-[0_8px_40px_rgba(249,115,22,0.45)] hover:bg-[#ea6c05] hover:shadow-[0_12px_50px_rgba(249,115,22,0.6)] transition-all duration-200"
            >
              Vraag een gratis website-audit aan
              <ArrowRight className="w-6 h-6" />
            </a>
          </motion.div>

          {/* Guarantees */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {guarantees.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0" strokeWidth={2.5} />
                <span className="font-body text-sm text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}