from pathlib import Path
p = Path(r"C:\Users\AUSTO\Downloads\Auraaaa\aura-intimates\src\pages\Contact.jsx")
text = p.read_text(encoding="utf-8")
old = '''                    <div key={i} className="flex gap-3">
                      <span className="mt-1 text-ink/50"><FaChevronRight /></span>
                      <div>
                        <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>
                      <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>'''
new = '''                    <div key={i} className="flex gap-3">
                      <span className="mt-1 text-ink/50"><FaChevronRight /></span>
                      <div>
                        <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>
                        <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>'''
if old not in text:
    raise SystemExit('Old snippet not found')
text = text.replace(old, new)
p.write_text(text, encoding="utf-8")
print('fixed')
