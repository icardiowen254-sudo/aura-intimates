import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = resolve(__dirname, 'src', 'pages', 'Contact.jsx');
let text = readFileSync(file, 'utf8');
const oldImport = "import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';";
const newImport = "import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock, FaHeart, FaChevronRight } from 'react-icons/fa';";
if (!text.includes(oldImport)) {
  console.error('Import line not found');
} else {
  text = text.replace(oldImport, newImport);
}
const oldFaq = `                  [
                    { q: 'How discreet is your packaging?', a: 'All orders are shipped in plain, unmarked boxes with no indication of contents. Billing statements show "Aura Ltd" only.' },
                    { q: 'Do you ship across Kenya?', a: 'Yes! We ship nationwide. Orders over KES 5,000 ship free. Standard delivery takes 2–4 business days.' },
                    { q: 'Can I track my order?', a: 'You\\'ll receive a tracking link via SMS and email once your order ships.' },
                  ].map((faq, i) => (
                    <div key={i}>
                      <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>
                      <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>
                    </div>
                  ))`;
const newFaq = `                  [
                    { q: 'How discreet is your packaging?', a: 'All orders are shipped in plain, unmarked boxes with no indication of contents. Billing statements show "Aura Ltd" only.' },
                    { q: 'Do you ship across Kenya?', a: 'Yes! We ship nationwide. Orders over KES 5,000 ship free. Standard delivery takes 2–4 business days.' },
                    { q: 'Can I track my order?', a: 'You\\'ll receive a tracking link via SMS and email once your order ships.' },
                  ].map((faq, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="mt-1 text-ink/50"><FaChevronRight /></span>
                      <div>
                        <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>
                        <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  ))`;
if (!text.includes(oldFaq)) {
  console.error('FAQ block not found');
} else {
  text = text.replace(oldFaq, newFaq);
  writeFileSync(file, text, 'utf8');
  console.log('updated');
}
