import { motion } from 'framer-motion';
import { ClipboardCheck, Hammer, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Gratis website audit',
    description:
      'We analyseren uw huidige website gratis en volledig. U krijgt een eerlijk overzicht van wat er beter kan, welke kansen u mist en hoe we dat oplossen.',
    duration: '30 minuten • Vrijblijvend',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Wij bouwen de nieuwe website',
    description:
      'Ons team bouwt uw nieuwe website op maat — gericht op uw regio, uw diensten en meer offerte-aanvragen. U wordt gedurende het proces op de hoogte gehouden.',
    duration: '2–3 weken doorlooptijd',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Live + meer leads ontvangen',
    description:
      'Uw nieuwe website gaat live. Wij monitoren de resultaten en optimaliseren continu. Meer telefoontjes, meer offerte-aanvragen, meer opdrachten.',
    duration: 'Resultaten binnen 30–90 dagen',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="werkwijze" className="section-padding bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#0F172A]/8 text-[#0F172A] border border-[#E2E8F0] rounded-full px-4 py-1.5 text-sm font-medium font-body mb-6">
            <span className="w-2 h-2 bg-[#0F172A] rounded-full" />
            Werkwijze
          </div>
          <h2 className="font-heading font-bold text-[#0F172A] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
            Van audit naar{' '}
            <span className="text-[#2563EB]">meer opdrachten</span>
          </h2>
          <p className="font-body text-[#0F172A]/60 text-lg leading-relaxed">
            Simpel, snel en zonder gedoe. Zo verloopt het traject van begin tot eind.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[calc(33.333%/2+1rem)] right-[calc(33.333%/2+1rem)] h-0.5 bg-gradient-to-r from-[#E2E8F0] via-[#F97316]/30 to-[#E2E8F0]" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="flex flex-col gap-5 relative"
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(249,115,22,0.3)] flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <span className="font-heading font-bold text-4xl text-[#E2E8F0]">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-[#0F172A] text-xl mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-body text-[#0F172A]/60 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
                    <span className="font-body text-xs text-[#0F172A]/55 font-medium">
                      {step.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}