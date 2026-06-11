import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = resolve(__dirname, 'src', 'pages', 'Contact.jsx');
let text = readFileSync(file, 'utf8');
const oldImport = "import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';";
if (text.includes(oldImport)) {
  text = text.replace(oldImport, "import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock, FaHeart, FaChevronRight } from 'react-icons/fa';");
}
const faqMarker = '                  ].map((faq, i) => (';
const faqPos = text.indexOf(faqMarker);
if (faqPos === -1) {
  console.error('FAQ marker not found');
  process.exit(1);
}
const divPos = text.indexOf('<div key={i}>', faqPos);
if (divPos === -1) {
  console.error('FAQ div not found');
  process.exit(1);
}
const firstPart = text.slice(0, divPos);
const rest = text.slice(divPos);
const oldPrefix = '<div key={i}>\n                      <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>\n';
if (!rest.startsWith(oldPrefix)) {
  console.error('FAQ prefix not matched');
  process.exit(1);
}
const replacementPrefix = '<div key={i} className="flex gap-3">\n                      <span className="mt-1 text-ink/50"><FaChevronRight /></span>\n                      <div>\n                        <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>\n';
const restAfterPrefix = rest.slice(oldPrefix.length);
const oldSuffix = '                      <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>\n                    </div>\n                  ))';
const suffixPos = restAfterPrefix.indexOf(oldSuffix);
if (suffixPos === -1) {
  console.error('FAQ suffix not found');
  process.exit(1);
}
const beforeSuffix = restAfterPrefix.slice(0, suffixPos);
const afterSuffix = restAfterPrefix.slice(suffixPos + oldSuffix.length);
const newSuffix = '                      <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>\n                      </div>\n                    </div>\n                  ))';
text = firstPart + replacementPrefix + beforeSuffix + newSuffix + afterSuffix;
writeFileSync(file, text, 'utf8');
console.log('patched');
