import { motion } from 'framer-motion';
import { Shield, TrendingUp, Smartphone, MapPin } from 'lucide-react';

const items = [
  { icon: Shield, text: 'Alleen voor dakdekkers' },
  { icon: TrendingUp, text: 'Gericht op meer offerte-aanvragen' },
  { icon: Smartphone, text: 'Snelle, mobiele websites' },
  { icon: MapPin, text: 'Geoptimaliseerd voor lokale leads' },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#0F172A] border-y border-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 lg:px-8 first:lg:pl-0 last:lg:pr-0"
              >
                <div className="w-9 h-9 bg-[#F97316]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#F97316]" strokeWidth={2} />
                </div>
                <span className="font-body text-sm font-medium text-white/80 leading-tight">
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}