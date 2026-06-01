import { Zap } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/nathanposthumus/30min';

export default function Footer() {
  /** @type {(id: string) => void} */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-heading font-bold text-white text-lg tracking-tight">
                NP Lead Agency
              </span>
            </div>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
              Wij bouwen hoogconverterende websites exclusief voor dakdekkersbedrijven in Nederland.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Navigatie
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Diensten', id: 'diensten' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Werkwijze', id: 'werkwijze' },
                { label: 'Over ons', id: 'over-ons' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Gratis audit aanvragen
            </p>
            <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
              Ontdek wat uw website mist en hoe wij meer opdrachten voor u kunnen genereren.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F97316] text-white font-heading font-bold text-sm px-5 py-3 rounded-xl shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:bg-[#ea6c05] transition-all duration-200"
            >
              Gratis website-audit
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} NP Lead Agency. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            <span className="font-body text-xs text-white/30">
              Exclusief voor dakdekkersbedrijven
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}