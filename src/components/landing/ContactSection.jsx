import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Phone, Mail } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ContactSection() {
  const [form, setForm] = useState({
    naam: '',
    bedrijfsnaam: '',
    telefoon: '',
    email: '',
    bericht: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Lead.create(form);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 rounded-full px-4 py-1.5 text-sm font-medium font-body mb-6">
              <span className="w-2 h-2 bg-[#F97316] rounded-full" />
              Contact
            </div>
            <h2 className="font-heading font-bold text-[#0F172A] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Stuur ons een{' '}
              <span className="text-[#F97316]">bericht</span>
            </h2>
            <p className="font-body text-[#0F172A]/65 text-lg leading-relaxed mb-8">
              Heeft u een vraag of wilt u meer informatie voordat u een audit aanvraagt? Vul het formulier in en wij reageren binnen 24 uur.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 p-5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="w-11 h-11 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-body text-xs text-[#0F172A]/45 mb-0.5">Telefoon</p>
                  <p className="font-heading font-semibold text-[#0F172A]">+31 (0) 6 00 000 000</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="w-11 h-11 bg-[#2563EB] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-body text-xs text-[#0F172A]/45 mb-0.5">E-mail</p>
                  <p className="font-heading font-semibold text-[#0F172A]">info@npleadagency.nl</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-heading font-bold text-[#0F172A] text-2xl mb-3">
                  Bericht ontvangen!
                </h3>
                <p className="font-body text-[#0F172A]/65 text-base leading-relaxed">
                  Bedankt voor uw bericht. Wij nemen binnen 24 uur contact met u op.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-8 flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-sm font-medium text-[#0F172A]">
                      Naam <span className="text-[#F97316]">*</span>
                    </label>
                    <input
                      type="text"
                      name="naam"
                      required
                      value={form.naam}
                      onChange={handleChange}
                      placeholder="Jan de Vries"
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 font-body text-sm text-[#0F172A] placeholder-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-sm font-medium text-[#0F172A]">
                      Bedrijfsnaam <span className="text-[#F97316]">*</span>
                    </label>
                    <input
                      type="text"
                      name="bedrijfsnaam"
                      required
                      value={form.bedrijfsnaam}
                      onChange={handleChange}
                      placeholder="De Vries Dakwerken"
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 font-body text-sm text-[#0F172A] placeholder-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-sm font-medium text-[#0F172A]">
                      Telefoonnummer <span className="text-[#F97316]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="telefoon"
                      required
                      value={form.telefoon}
                      onChange={handleChange}
                      placeholder="+31 6 00 000 000"
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 font-body text-sm text-[#0F172A] placeholder-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-sm font-medium text-[#0F172A]">
                      E-mail <span className="text-[#F97316]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jan@dakwerken.nl"
                      className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 font-body text-sm text-[#0F172A] placeholder-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-sm font-medium text-[#0F172A]">
                    Bericht
                  </label>
                  <textarea
                    name="bericht"
                    rows={4}
                    value={form.bericht}
                    onChange={handleChange}
                    placeholder="Vertel ons kort over uw bedrijf en wat u wilt bereiken..."
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 font-body text-sm text-[#0F172A] placeholder-[#0F172A]/35 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-cta w-full justify-center text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Versturen...
                    </span>
                  ) : (
                    <>
                      Verstuur bericht
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="font-body text-xs text-center text-[#0F172A]/40">
                  Uw gegevens worden vertrouwelijk behandeld en nooit gedeeld met derden.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}