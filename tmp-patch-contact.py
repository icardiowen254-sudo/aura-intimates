from pathlib import Path

p = Path(r"C:\Users\AUSTO\Downloads\Auraaaa\aura-intimates\src\pages\Contact.jsx")
text = p.read_text(encoding="utf-8")
old_prefix = '''                    <div key={i}>
                      <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>
'''
new_prefix = '''                    <div key={i} className="flex gap-3">
                      <span className="mt-1 text-ink/50"><FaChevronRight /></span>
                      <div>
                        <p className="font-sans text-sm font-medium text-ink mb-1">{faq.q}</p>
'''
old_suffix = '''                      <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>
                    </div>
                  ))'''
new_suffix = '''                      <p className="font-sans text-xs text-ink/50 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  ))'''

if old_prefix not in text:
    raise SystemExit('old_prefix not found')
if old_suffix not in text:
    raise SystemExit('old_suffix not found')

text = text.replace(old_prefix, new_prefix, 1)
text = text.replace(old_suffix, new_suffix, 1)
p.write_text(text, encoding="utf-8")
print('patched')
