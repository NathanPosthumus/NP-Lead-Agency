import { motion } from 'framer-motion';
import { CheckCircle2, Users, Award, Target } from 'lucide-react';

const differentiators = [
  'Wij werken uitsluitend met dakdekkersbedrijven',
  'Diepgaande kennis van de bouw- en dakdekkersbranche',
  'Elke website is gericht op lead generatie, niet alleen op design',
  'Lokale SEO-expertise voor elke gemeente en regio',
  'Continue optimalisatie na oplevering',
  'Transparante rapportage van resultaten',
];

const stats = [
  { icon: Users, value: '14+', label: 'Dakdekkers geholpen' },
  { icon: Target, value: '68%', label: 'Gem. meer leads' },
  { icon: Award, value: '100%', label: 'Niche focus' },
];

export default function AboutSection() {
  return (
    <section id="over-ons" className="section-padding bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 rounded-full px-4 py-1.5 text-sm font-medium font-body mb-6">
              <span className="w-2 h-2 bg-[#2563EB] rounded-full" />
              Over NP Lead Agency
            </div>
            <h2 className="font-heading font-bold text-[#0F172A] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Geen generalist.{' '}
              <span className="text-[#2563EB]">Dé specialist</span>{' '}
              voor dakdekkers.
            </h2>
            <p className="font-body text-[#0F172A]/65 text-lg leading-relaxed mb-6">
              NP Lead Agency is geen alleskunner. Wij hebben bewust gekozen om uitsluitend te werken met dakdekkersbedrijven in Nederland. Dat betekent dat wij uw branche door en door kennen: de seizoensgebondenheid, de zoekopdrachten van uw klanten, de concurrentie in uw regio.
            </p>
            <p className="font-body text-[#0F172A]/65 text-base leading-relaxed mb-8">
              Terwijl andere bureaus tientallen klanten per sector bedienen, zijn wij volledig gespecialiseerd. Uw website profiteert van alles wat we geleerd hebben bij elke andere dakdekker die we geholpen hebben.
            </p>

            <ul className="flex flex-col gap-3">
              {differentiators.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="font-body text-sm text-[#0F172A]/70 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Stats + Visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-[#E2E8F0] text-center shadow-sm">
                    <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <p className="font-heading font-bold text-2xl text-[#0F172A] mb-1">{stat.value}</p>
                    <p className="font-body text-xs text-[#0F172A]/50 leading-tight">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Image block */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
                alt="Vakmanschap dakdekkersbranche"
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-heading font-bold text-white text-xl leading-tight">
                  "Wij begrijpen uw branche. Dat is ons voordeel."
                </p>
                <p className="font-body text-white/70 text-sm mt-1">— NP Lead Agency</p>
              </div>
            </div>

            {/* Niche badge */}
            <div className="bg-[#0F172A] rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-base leading-snug">
                  Exclusief voor dakdekkersbedrijven
                </p>
                <p className="font-body text-white/55 text-sm mt-0.5">
                  Wij accepteren alleen klanten uit de dakdekkersbranche
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}