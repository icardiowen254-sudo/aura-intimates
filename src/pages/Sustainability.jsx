import ScrollReveal from '../components/animations/ScrollReveal';
import { FaLeaf, FaTint, FaRecycle, FaHandshake, FaCloud, FaBoxOpen } from 'react-icons/fa';

const pillars = [
  { icon: FaLeaf, title: 'Organic Materials', desc: 'We source only GOTS-certified organic cotton, TENCEL™ lyocell, and recycled fibres. Zero synthetic pesticides. Ever.', stat: '100%', statLabel: 'Certified Organic' },
  { icon: FaTint, title: 'Water Conscious', desc: 'Our dyeing process uses 80% less water than conventional methods, powered by closed-loop water recycling systems.', stat: '80%', statLabel: 'Less Water Used' },
  { icon: FaRecycle, title: 'Circular Packaging', desc: 'Every box, tissue, and ribbon is 100% biodegradable or made from post-consumer recycled materials. Zero plastic.', stat: '0%', statLabel: 'Plastic Packaging' },
  { icon: FaHandshake, title: 'Fair Trade Partners', desc: 'All manufacturing partners are certified Fair Trade. Living wages, safe conditions, and dignity for every worker.', stat: '100%', statLabel: 'Fair Trade Certified' },
  { icon: FaCloud, title: 'Carbon Offset', desc: 'We offset 110% of our carbon footprint annually through verified reforestation projects across East Africa.', stat: '110%', statLabel: 'Carbon Offset' },
  { icon: FaBoxOpen, title: 'Discreet & Green', desc: 'Our discreet packaging is not just private it\'s fully compostable. Privacy and planet, together.', stat: '100%', statLabel: 'Compostable' },
];

export default function Sustainability() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden mb-16">
        <img src="https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=1400&q=80" alt="Sustainability" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/50 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase font-sans text-cream/60 mb-3">Our Commitment</p>
            <h1 className="font-serif text-5xl md:text-7xl text-cream mb-4">Luxury that<br /><em>loves the planet</em></h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Intro */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="font-serif text-3xl text-ink mb-6">We believe luxury and sustainability are inseparable</h2>
          <p className="font-sans text-sm text-ink/60 leading-relaxed">
            From the fibre we source to the box we ship in, every decision at Aura Intimates is filtered through one question: is this good for people and planet? Our commitment isn't a marketing claim it's woven into every thread of who we are.
          </p>
        </ScrollReveal>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {pillars.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="border border-blush/20 p-8 hover:border-blush/50 transition-colors">
                <span className="text-3xl mb-4 block"><p.icon className="inline-block" /></span>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-3xl text-ink">{p.stat}</span>
                  <span className="text-xs font-sans text-ink/40 uppercase tracking-wider">{p.statLabel}</span>
                </div>
                <h3 className="font-serif text-xl text-ink mb-3">{p.title}</h3>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Report CTA */}
        <ScrollReveal>
          <div className="bg-ink text-cream p-12 md:p-16 text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-sans text-cream/40 mb-3">Transparency</p>
            <h3 className="font-serif text-4xl mb-4">Read our Impact Report</h3>
            <p className="font-sans text-sm text-cream/60 max-w-md mx-auto mb-8">
              Full transparency on our environmental and social impact updated annually.
            </p>
            <a
              href="/assets/sustainability-report.pdf"
              download
              className="inline-block bg-cream text-ink px-8 py-3.5 text-xs tracking-widest uppercase font-sans hover:bg-blush transition-colors"
            >
              Download Report (PDF)
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
