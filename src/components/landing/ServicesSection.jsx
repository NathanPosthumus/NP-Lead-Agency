import { motion } from 'framer-motion';
import { Globe, Target, MapPin, BarChart2, Smartphone } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website design voor dakdekkers',
    description:
      'Op maat gemaakte websites die uw expertise uitstralen en bezoekers omzetten in betalende klanten. Gebouwd specifiek voor de dakdekkersbranche.',
    highlight: 'Conversie-first design',
  },
  {
    icon: Target,
    title: 'Lead-focused landing pages',
    description:
      'Gerichte landingspagina\'s voor uw meest winstgevende diensten — dakbedekking, renovatie, noodreparaties. Elk geoptimaliseerd voor maximale aanvragen.',
    highlight: 'Per dienst geoptimaliseerd',
  },
  {
    icon: MapPin,
    title: 'Lokale SEO structuur',
    description:
      'Uw bedrijf bovenaan Google in uw regio. We bouwen de juiste technische basis zodat klanten in uw werkgebied u als eerste vinden.',
    highlight: 'Pagina 1 strategie',
  },
  {
    icon: BarChart2,
    title: 'Conversie optimalisatie',
    description:
      'We analyseren waarom bezoekers niet converteren en lossen het op. A/B testing, heatmaps, en iteratieve verbeteringen voor meer offerte-aanvragen.',
    highlight: 'Data-gedreven resultaten',
  },
  {
    icon: Smartphone,
    title: 'Mobiele optimalisatie',
    description:
      'Perfecte gebruikerservaring op elk scherm. Razendsnelle laadtijden en intuïtieve navigatie zodat mobiele bezoekers direct contact opnemen.',
    highlight: 'Core Web Vitals geoptimaliseerd',
  },
];

export default function ServicesSection() {
  return (
    <section id="diensten" className="section-padding bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 rounded-full px-4 py-1.5 text-sm font-medium font-body mb-6">
            <span className="w-2 h-2 bg-[#2563EB] rounded-full" />
            Onze diensten
          </div>
          <h2 className="font-heading font-bold text-[#0F172A] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
            Alles wat uw website nodig heeft{' '}
            <span className="text-[#2563EB]">om te presteren</span>
          </h2>
          <p className="font-body text-[#0F172A]/60 text-lg leading-relaxed">
            Geen generieke pakketten. Elke dienst is ontworpen vanuit één doel: meer opdrachten voor uw dakdekkersbedrijf.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className={`bg-[#F8FAFC] rounded-2xl p-7 border border-[#E2E8F0] card-hover group ${
                  i === 0 ? 'lg:col-span-1 md:col-span-2 lg:md:col-span-1' : ''
                }`}
              >
                <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#F97316] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-medium font-body px-2.5 py-1 rounded-full mb-3">
                  {service.highlight}
                </div>
                <h3 className="font-heading font-bold text-[#0F172A] text-lg mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="font-body text-[#0F172A]/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}