import { motion } from 'framer-motion';
import { AlertTriangle, PhoneMissed, Search, Monitor } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Verouderd design straalt geen vertrouwen uit',
    description:
      'Een potentiële klant beslist in 3 seconden of hij u belt of naar de concurrent gaat. Een verouderde website kost u elke dag opdrachten.',
    stat: '94%',
    statLabel: 'van klanten oordeelt op design',
  },
  {
    icon: PhoneMissed,
    title: 'Geen offerte-aanvragen via de website',
    description:
      'Bezoekers komen, maar bellen niet. Uw website heeft geen duidelijke call-to-action en laat geen formulieren of belmogelijkheden zien.',
    stat: '3x',
    statLabel: 'meer leads na optimalisatie',
  },
  {
    icon: Search,
    title: 'Slechte vindbaarheid in Google',
    description:
      'Als u niet op pagina 1 van Google staat voor "dakdekker [uw stad]", bestaat u niet voor de meeste potentiële klanten.',
    stat: '75%',
    statLabel: 'klikt nooit verder dan pagina 1',
  },
  {
    icon: Monitor,
    title: 'Niet mobiel geoptimaliseerd',
    description:
      'Meer dan 70% van de bezoekers gebruikt een smartphone. Een trage of slecht leesbare site op mobiel = gemiste opdrachten.',
    stat: '70%+',
    statLabel: 'bezoek via mobiel',
  },
];

export default function ProblemSection() {
  return (
    <section id="problemen" className="section-padding bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 rounded-full px-4 py-1.5 text-sm font-medium font-body mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            De harde waarheid
          </div>
          <h2 className="font-heading font-bold text-[#0F172A] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
            Waarom uw website{' '}
            <span className="text-red-500">u geld kost</span>
          </h2>
          <p className="font-body text-[#0F172A]/60 text-lg leading-relaxed">
            De meeste dakdekkerwebsites zijn gebouwd door generieke bureaus die geen idee hebben van uw branche. Het resultaat: een mooie website die niemand belt.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 lg:p-8 border border-[#E2E8F0] card-hover group"
              >
                <div className="flex items-start gap-5">
                  {/* Icon stamp */}
                  <div className="w-12 h-12 bg-red-50 border-2 border-red-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-red-300 transition-colors">
                    <Icon className="w-5 h-5 text-red-500" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-[#0F172A] text-lg leading-snug mb-3">
                      {problem.title}
                    </h3>
                    <p className="font-body text-[#0F172A]/60 text-sm leading-relaxed mb-5">
                      {problem.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-bold text-2xl text-[#F97316]">
                        {problem.stat}
                      </span>
                      <span className="font-body text-xs text-[#0F172A]/45">
                        {problem.statLabel}
                      </span>
                    </div>
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