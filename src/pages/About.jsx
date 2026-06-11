import ScrollReveal from '../components/animations/ScrollReveal';
import { Link } from 'react-router-dom';
import OwenImage from '../assets/owen.jpeg';
import AurahImage from '../assets/AURAH.jpeg';

const values = [
  { title: 'Inclusive by Design', desc: 'We design for XS to 5X from the very first sketch. Inclusivity isn\'t an afterthought — it\'s our foundation.' },
  { title: 'Radical Transparency', desc: 'We publish our material sources, factory names, and impact numbers. Because you deserve to know.' },
  { title: 'Body Positivity', desc: 'Our campaigns feature real bodies in all their beauty. No retouching. No exceptions.' },
  { title: 'Made to Last', desc: 'We create pieces designed to outlast trends — both in quality and in style.' },
];

const team = [
  { name: 'P,O Owen Amisi', role: 'Founder & Creative Director', img: OwenImage },
  { name: 'Tariq Patel', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Julie Bergan', role: 'Sustainability Lead', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
];

export default function About() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden mb-16">
        <img src="https://images.unsplash.com/photo-1519235624215-85175d5eb36e?w=1400&q=80" alt="About Aura" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/50 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase font-sans text-cream/60 mb-3">Who We Are</p>
            <h1 className="font-serif text-5xl md:text-7xl text-cream">About Aura</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-24">
        {/* Origin */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <ScrollReveal direction="left">
            <img src={AurahImage} alt="Our story" className="w-full aspect-square object-cover" />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.1}>
            <p className="section-subtitle">Our Origin</p>
            <h2 className="font-serif text-4xl text-ink mb-6">Born in Nairobi. Made for Everyone.</h2>
            <p className="font-sans text-sm text-ink/60 leading-relaxed mb-4">
              Aura Intimates was founded in 2022 by P.O. Owen Amisi, a Nairobi-based designer who was tired of choosing between beautiful men inner wears not forgetting to include the women and comfortable fit and couldn't find luxury intimates that truly celebrated his body.
            </p>
            <p className="font-sans text-sm text-ink/60 leading-relaxed mb-4">
              He started with a simple mission: create intimates that feel as extraordinary as they look, in every size, for every body.
            </p>
            <p className="font-sans text-sm text-ink/60 leading-relaxed">
              Today, Aura ships across Kenya and East Africa, and has been worn by over 8000 customers who believe that intimacy is an act of self-love.
            </p>
          </ScrollReveal>
        </div>

        {/* Values */}
        <ScrollReveal className="mb-20">
          <div className="text-center mb-12">
            <p className="section-subtitle">What We Stand For</p>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-blush/20 hover:border-blush/50 transition-colors">
                  <h3 className="font-serif text-xl text-ink mb-3">{v.title}</h3>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Team */}
        <ScrollReveal className="mb-20">
          <div className="text-center mb-12">
            <p className="section-subtitle">The Humans Behind Aura</p>
            <h2 className="section-title">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                <img src={member.img} alt={member.name} className="w-full aspect-square object-cover object-top mb-4" />
                <h3 className="font-serif text-xl text-ink">{member.name}</h3>
                <p className="font-sans text-xs tracking-wider text-ink/50 uppercase mt-1">{member.role}</p>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="bg-blush/20 border border-blush/30 p-12 text-center">
            <h3 className="font-serif text-3xl text-ink mb-4">Start your Aura journey</h3>
            <p className="font-sans text-sm text-ink/60 max-w-sm mx-auto mb-8">
              Discover pieces crafted for the way you live — and the way you love yourself.
            </p>
            <Link to="/shop/women" className="btn-primary inline-block">Shop the Collection</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
