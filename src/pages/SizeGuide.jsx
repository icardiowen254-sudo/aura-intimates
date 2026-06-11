import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/animations/ScrollReveal';

const womenBraSizes = [
  { us: '32A', uk: '32A', eu: '70A', bust: '77–79', underbust: '67–72' },
  { us: '34B', uk: '34B', eu: '75B', bust: '87–89', underbust: '72–77' },
  { us: '36C', uk: '36C', eu: '80C', bust: '94–97', underbust: '77–82' },
  { us: '38D', uk: '38D', eu: '85D', bust: '101–104', underbust: '82–87' },
  { us: '40DD', uk: '40DD', eu: '90E', bust: '108–112', underbust: '87–92' },
  { us: '42DDD', uk: '42E', eu: '95F', bust: '115–119', underbust: '92–97' },
];

const womenBottomSizes = [
  { us: 'XS', uk: '6', eu: '34', ke: 'XS', waist: '60–64', hip: '84–88' },
  { us: 'S', uk: '8', eu: '36', ke: 'S', waist: '65–69', hip: '89–93' },
  { us: 'M', uk: '10', eu: '38', ke: 'M', waist: '70–74', hip: '94–98' },
  { us: 'L', uk: '12', eu: '40', ke: 'L', waist: '75–80', hip: '99–104' },
  { us: 'XL', uk: '14', eu: '42', ke: 'XL', waist: '81–87', hip: '105–111' },
  { us: 'XXL', uk: '16', eu: '44', ke: '2X', waist: '88–95', hip: '112–119' },
  { us: '3X', uk: '18', eu: '46', ke: '3X', waist: '96–104', hip: '120–128' },
  { us: '4X', uk: '20', eu: '48', ke: '4X', waist: '105–114', hip: '129–138' },
];

const menSizes = [
  { us: 'S', uk: 'S', eu: 'S', ke: 'S', waist: '70–76', hip: '86–92' },
  { us: 'M', uk: 'M', eu: 'M', ke: 'M', waist: '77–84', hip: '93–99' },
  { us: 'L', uk: 'L', eu: 'L', ke: 'L', waist: '85–92', hip: '100–107' },
  { us: 'XL', uk: 'XL', eu: 'XL', ke: 'XL', waist: '93–101', hip: '108–116' },
  { us: 'XXL', uk: 'XXL', eu: 'XXL', ke: '2X', waist: '102–111', hip: '117–126' },
  { us: '3X', uk: '3X', eu: '3X', ke: '3X', waist: '112–122', hip: '127–137' },
];

const measureSteps = [
  { title: 'Bust', icon: '📏', desc: 'Measure around the fullest part of your bust, keeping the tape parallel to the ground. Breathe normally.' },
  { title: 'Underbust', icon: '📐', desc: 'Measure directly under your bust, keeping the tape snug but not tight. This determines your bra band size.' },
  { title: 'Waist', icon: '〰️', desc: 'Measure around the narrowest part of your waist, usually about 2.5cm above your navel.' },
  { title: 'Hips', icon: '◯', desc: 'Stand with feet together. Measure around the fullest part of your hips, about 20cm below your waist.' },
];

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState('women-bra');
  const [openTip, setOpenTip] = useState(null);

  const tabs = [
    { id: 'women-bra', label: "Women's Bras" },
    { id: 'women-bottoms', label: "Women's Bottoms" },
    { id: 'men', label: "Men's" },
  ];

  return (
    <div className="pt-24 md:pt-28">
      <div className="max-w-5xl mx-auto px-4 pb-24">
        <ScrollReveal className="mb-12">
          <p className="section-subtitle">Find Your Perfect Fit</p>
          <h1 className="section-title">Size Guide</h1>
          <p className="font-sans text-sm text-ink/60 mt-3 max-w-lg">
            All measurements are in centimetres. If you're between sizes, we recommend sizing up for comfort.
          </p>
        </ScrollReveal>

        {/* How to measure */}
        <ScrollReveal className="mb-12">
          <h2 className="font-serif text-2xl text-ink mb-6">How to Measure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {measureSteps.map((step, i) => (
              <div key={i} className="flex gap-4 p-5 border border-blush/20 bg-champagne/10">
                <span className="text-2xl flex-shrink-0">{step.icon}</span>
                <div>
                  <h3 className="font-sans text-sm font-medium text-ink mb-1">{step.title}</h3>
                  <p className="font-sans text-xs text-ink/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-blush/20 border border-blush/30 p-4">
            <p className="font-sans text-xs text-ink/70">
              <strong>💡 Pro tip:</strong> Measure in your underwear, standing straight with feet together. Use a soft measuring tape. Have a friend help for more accuracy.
            </p>
          </div>
        </ScrollReveal>

        {/* Size tables */}
        <ScrollReveal>
          {/* Tabs */}
          <div className="flex border-b border-blush/20 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-xs tracking-widest uppercase font-sans transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink/40 hover:text-ink/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'women-bra' && (
                <div>
                  <h3 className="font-serif text-xl text-ink mb-4">Bra Sizes — Women</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-sans">
                      <thead>
                        <tr className="bg-champagne/40">
                          {['US/KE', 'UK', 'EU', 'Bust (cm)', 'Underbust (cm)'].map(h => (
                            <th key={h} className="px-4 py-3 text-left text-xs tracking-widest uppercase text-ink/50 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {womenBraSizes.map((row, i) => (
                          <tr key={i} className="border-b border-blush/15 hover:bg-champagne/20 transition-colors">
                            <td className="px-4 py-3 font-medium">{row.us}</td>
                            <td className="px-4 py-3 text-ink/70">{row.uk}</td>
                            <td className="px-4 py-3 text-ink/70">{row.eu}</td>
                            <td className="px-4 py-3 text-ink/70">{row.bust}</td>
                            <td className="px-4 py-3 text-ink/70">{row.underbust}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'women-bottoms' && (
                <div>
                  <h3 className="font-serif text-xl text-ink mb-4">Bottoms & Briefs — Women</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-sans">
                      <thead>
                        <tr className="bg-champagne/40">
                          {['US', 'UK', 'EU', 'KE', 'Waist (cm)', 'Hip (cm)'].map(h => (
                            <th key={h} className="px-4 py-3 text-left text-xs tracking-widest uppercase text-ink/50 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {womenBottomSizes.map((row, i) => (
                          <tr key={i} className="border-b border-blush/15 hover:bg-champagne/20 transition-colors">
                            <td className="px-4 py-3 font-medium">{row.us}</td>
                            <td className="px-4 py-3 text-ink/70">{row.uk}</td>
                            <td className="px-4 py-3 text-ink/70">{row.eu}</td>
                            <td className="px-4 py-3 font-medium text-burgundy">{row.ke}</td>
                            <td className="px-4 py-3 text-ink/70">{row.waist}</td>
                            <td className="px-4 py-3 text-ink/70">{row.hip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'men' && (
                <div>
                  <h3 className="font-serif text-xl text-ink mb-4">Men's Underwear & Essentials</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-sans">
                      <thead>
                        <tr className="bg-champagne/40">
                          {['US', 'UK', 'EU', 'KE', 'Waist (cm)', 'Hip (cm)'].map(h => (
                            <th key={h} className="px-4 py-3 text-left text-xs tracking-widest uppercase text-ink/50 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {menSizes.map((row, i) => (
                          <tr key={i} className="border-b border-blush/15 hover:bg-champagne/20 transition-colors">
                            <td className="px-4 py-3 font-medium">{row.us}</td>
                            <td className="px-4 py-3 text-ink/70">{row.uk}</td>
                            <td className="px-4 py-3 text-ink/70">{row.eu}</td>
                            <td className="px-4 py-3 font-medium text-burgundy">{row.ke}</td>
                            <td className="px-4 py-3 text-ink/70">{row.waist}</td>
                            <td className="px-4 py-3 text-ink/70">{row.hip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal className="mt-16">
          <h2 className="font-serif text-2xl text-ink mb-6">Fitting FAQs</h2>
          <div className="space-y-2">
            {[
              { q: "What if I'm between sizes?", a: "We always recommend sizing up for briefs and bottoms for maximum comfort. For bras, it depends on whether you're between band sizes or cup sizes — contact us and we'll help!" },
              { q: "Do your sizes run true to size?", a: "Our pieces are designed to fit true to size. Our modal and stretch-lace pieces have natural give, so they tend to accommodate a range within each size." },
              { q: "Can I return if the size doesn't fit?", a: "Absolutely. We offer free returns within 14 days of delivery for unworn, tagged items. Your comfort is our priority." },
              { q: "Do you offer custom sizing?", a: "For our premium sets and robes, we offer made-to-measure options. Contact our team for details." },
            ].map((faq, i) => (
              <div key={i} className="border border-blush/20">
                <button
                  onClick={() => setOpenTip(openTip === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                >
                  <span className="font-sans text-sm font-medium text-ink">{faq.q}</span>
                  <span className="text-ink/40 ml-4">{openTip === i ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {openTip === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 font-sans text-sm text-ink/60 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Print */}
        <ScrollReveal className="mt-10 text-center">
          <button onClick={() => window.print()} className="btn-outline">
            🖨️ Print Size Guide
          </button>
        </ScrollReveal>
      </div>
    </div>
  );
}
