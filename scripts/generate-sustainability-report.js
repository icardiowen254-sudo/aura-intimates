import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import PDFDocument from 'pdfkit'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const outputPath = path.join(projectRoot, 'public', 'assets', 'sustainability-report.pdf')
const aurahImagePath = path.join(projectRoot, 'src', 'assets', 'AURAH.jpeg')

const colors = {
  ink: '#1A1614',
  cream: '#FAF6F0',
  blush: '#E8B4B8',
  burgundy: '#6B2737',
  champagne: '#F7E7CE',
  moss: '#50675B',
  sand: '#E6D8C8',
  line: '#D8CEC2',
  softText: '#5C5450',
}

const margins = 54
const pageWidth = 595.28
const pageHeight = 841.89

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: margins, left: margins, bottom: margins, right: margins },
  bufferPages: true,
})

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
const stream = fs.createWriteStream(outputPath)
doc.pipe(stream)

doc.info.Title = 'Aura Intimates Sustainability Report 2026'
doc.info.Author = 'Aura Intimates'
doc.info.Subject = 'Sustainability and impact report'
doc.info.Keywords = 'Aura Intimates, sustainability, impact report, Kenya, intimates'

const usableWidth = pageWidth - margins * 2

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  }
}

function fillBackground(color) {
  doc.save()
  doc.rect(0, 0, pageWidth, pageHeight).fill(color)
  doc.restore()
}

function drawCoverBackground() {
  if (fs.existsSync(aurahImagePath)) {
    doc.save()
    doc.image(aurahImagePath, 0, 0, { fit: [pageWidth, pageHeight], align: 'center', valign: 'center' })
    doc.rect(0, 0, pageWidth, pageHeight).fillOpacity(0.56).fill(colors.ink)
    doc.restore()
  } else {
    fillBackground(colors.ink)
  }
}

function topBand(title, subtitle) {
  doc
    .fillColor(colors.ink)
    .font('Helvetica-Bold')
    .fontSize(11)
    .text('AURA INTIMATES', margins, 30, { width: 180, align: 'left', characterSpacing: 1.8 })

  doc
    .fillColor(colors.softText)
    .font('Helvetica')
    .fontSize(9)
    .text('Luxury innerwear, Nairobi, Kenya', pageWidth - margins - 180, 30, { width: 180, align: 'right' })

  doc
    .moveTo(margins, 56)
    .lineTo(pageWidth - margins, 56)
    .lineWidth(0.8)
    .strokeColor(colors.line)
    .stroke()

  doc
    .fillColor(colors.ink)
    .font('Times-Bold')
    .fontSize(28)
    .text(title, margins, 74, { width: usableWidth * 0.7 })

  doc
    .fillColor(colors.softText)
    .font('Helvetica')
    .fontSize(10)
    .text(subtitle, margins, 110, { width: usableWidth * 0.72, lineGap: 4 })
}

function sectionTitle(text, subtitle, y) {
  doc
    .fillColor(colors.ink)
    .font('Times-Bold')
    .fontSize(24)
    .text(text, margins, y, { width: usableWidth })

  if (subtitle) {
    doc
      .fillColor(colors.softText)
      .font('Helvetica')
      .fontSize(10)
      .text(subtitle, margins, y + 28, { width: usableWidth * 0.8, lineGap: 4 })
  }
}

function statCard(x, y, w, h, value, label, accent = colors.blush) {
  doc.save()
  doc.roundedRect(x, y, w, h, 14).fillAndStroke('#FFFFFF', colors.line)
  doc.roundedRect(x + 1, y + 1, w - 2, h - 2, 14).fillOpacity(1)
  doc.fillColor(accent).roundedRect(x + 1, y + 1, 5, h - 2, 14).fill()
  doc.restore()

  doc.fillColor(colors.ink).font('Helvetica-Bold').fontSize(20).text(value, x + 18, y + 16, { width: w - 36 })
  doc.fillColor(colors.softText).font('Helvetica').fontSize(8.5).text(label.toUpperCase(), x + 18, y + 42, { width: w - 36, characterSpacing: 1 })
}

function infoCard(x, y, w, h, title, body, tag) {
  doc.roundedRect(x, y, w, h, 16).fillAndStroke('#FFFFFF', colors.line)
  doc.fillColor(colors.burgundy).font('Helvetica-Bold').fontSize(8).text(tag.toUpperCase(), x + 16, y + 16, { width: w - 32, characterSpacing: 1.1 })
  doc.fillColor(colors.ink).font('Times-Bold').fontSize(16).text(title, x + 16, y + 34, { width: w - 32 })
  doc.fillColor(colors.softText).font('Helvetica').fontSize(9.2).text(body, x + 16, y + 58, { width: w - 32, lineGap: 3.5 })
}

function bulletList(items, x, y, width, options = {}) {
  let cursorY = y
  items.forEach((item, index) => {
    doc.fillColor(options.bulletColor || colors.burgundy).circle(x + 4, cursorY + 5, 2.2).fill()
    doc.fillColor(colors.ink).font('Helvetica').fontSize(options.fontSize || 9.4).text(item, x + 14, cursorY, { width, lineGap: 3 })
    cursorY = doc.y + (options.gapAfter || 6)
  })
  return cursorY
}

function drawFooter(pageIndex, pageTotal) {
  doc.save()
  doc.lineWidth(0.6).strokeColor(colors.line)
  doc.moveTo(margins, pageHeight - 44).lineTo(pageWidth - margins, pageHeight - 44).stroke()
  doc.fillColor(colors.softText).font('Helvetica').fontSize(8.5).text('Aura Intimates Sustainability Report 2026', margins, pageHeight - 33, { width: 240 })
  doc.text(`Page ${pageIndex} of ${pageTotal}`, pageWidth - margins - 70, pageHeight - 33, { width: 70, align: 'right' })
  doc.restore()
}

// Cover page
drawCoverBackground()

doc.save()
doc.circle(pageWidth - 110, 110, 78).fill('#2C241F')
doc.circle(pageWidth - 140, 760, 120).fill('#2A2220')
doc.circle(110, 730, 76).fill('#2A1F25')
doc.restore()

doc.save()
doc.roundedRect(margins, 48, 112, 30, 10).fill('#F9F2E8')
doc.fillColor(colors.ink).font('Helvetica-Bold').fontSize(10).text('IMPACT REPORT', margins + 14, 59, { width: 84, characterSpacing: 2.2, align: 'center' })
doc.restore()

doc.fillColor('#F9F2E8').font('Times-Bold').fontSize(38).text('Sustainability\nReport', margins, 112, { width: 320, lineGap: 4 })
doc.fillColor('#F9F2E8').font('Times-Italic').fontSize(20).text('For the year 2026', margins, 212, { width: 220 })
doc.fillColor('#F3EBDE').font('Helvetica').fontSize(11).text('A premium annual snapshot of the materials, people, packaging, and delivery choices behind Aura Intimates.', margins, 258, { width: 345, lineGap: 5 })

statCard(margins, 338, 118, 72, '100%', 'Certified organic materials', colors.champagne)
statCard(margins + 132, 338, 118, 72, '80%', 'Less water in dyeing', colors.blush)
statCard(margins + 264, 338, 118, 72, '0%', 'Plastic packaging', colors.moss)
statCard(margins + 396, 338, 118, 72, '110%', 'Carbon offset coverage', colors.sand)

infoCard(margins, 446, 210, 142, 'Material promise', 'We source GOTS-certified organic cotton, TENCEL™ lyocell, and recycled fibres to keep the product line soft, durable, and responsible.', 'Materials')
infoCard(margins + 228, 446, 210, 142, 'Customer promise', 'Orders are packed discreetly, shipped with care, and supported by a human-first customer service approach based in Nairobi.', 'Service')

doc.fillColor('#EFE5D7').font('Helvetica').fontSize(9).text('Aura Intimates  |  Nairobi, Kenya  |  Prepared for customers, partners, and stakeholders', margins, 640, { width: usableWidth })

// Page 2

doc.addPage({ margins: { top: margins, left: margins, bottom: margins, right: margins } })
fillBackground(colors.cream)
topBand('Executive Summary', 'A concise view of how Aura Intimates balances luxury, responsibility, and customer experience.')

sectionTitle('What this report shows', null, 152)
doc.fillColor(colors.softText).font('Helvetica').fontSize(10).text(
  'Aura Intimates is designed as a premium Kenyan intimates brand with sustainability embedded into product selection, packaging, delivery, and support. This report summarizes the current operating principles and the next steps that will keep the brand transparent and trusted.',
  margins,
  184,
  { width: usableWidth, lineGap: 4.2 }
)

const summaryCardsY = 286
infoCard(margins, summaryCardsY, 160, 122, 'Design principle', 'Luxury should feel calm, clear, and intentional. Our layouts, packaging, and product storytelling reflect that standard.', 'Brand')
infoCard(margins + 178, summaryCardsY, 160, 122, 'Operational lens', 'The brand focuses on discreet packing, efficient support, and delivery transparency across Kenya.', 'Operations')
infoCard(margins + 356, summaryCardsY, 160, 122, 'Future focus', 'We are building the systems needed for tracking, confirmations, and richer customer notifications.', 'Roadmap')

sectionTitle('At a glance', null, 446)
const metrics = [
  ['22', 'Sample products available'],
  ['4', 'Core sustainability pillars'],
  ['2-4 days', 'Typical Kenya delivery window'],
  ['24h', 'Response target for support'],
]
let metricX = margins
metrics.forEach(([value, label], idx) => {
  statCard(metricX, 484, 116, 76, value, label, idx % 2 === 0 ? colors.blush : colors.champagne)
  metricX += 130
})

// Page 3

doc.addPage({ margins: { top: margins, left: margins, bottom: margins, right: margins } })
fillBackground('#FBF7F0')
topBand('Impact by Pillar', 'How the brand is structured around materials, water, packaging, and people.')

const pillars = [
  { title: 'Organic Materials', body: 'We aim to use certified organic cotton and premium responsible fibres for softness and durability.', stat: '100%', note: 'Organic certified'
  },
  { title: 'Water Consciousness', body: 'Dyeing and finishing are selected to reduce water impact while keeping colour quality high.', stat: '80%', note: 'Less water use'
  },
  { title: 'Circular Packaging', body: 'Packaging is designed to be compostable or recyclable, with privacy and presentation kept intact.', stat: '0%', note: 'Plastic packaging'
  },
  { title: 'Fair Trade Partners', body: 'We value safe working conditions, living wages, and respectful production partnerships.', stat: '100%', note: 'Fair trade partners'
  },
]

let cardY = 150
pillars.forEach((pillar, index) => {
  const leftX = index % 2 === 0 ? margins : margins + 272
  if (index % 2 === 0 && index > 0) cardY += 162
  infoCard(leftX, cardY, 238, 140, pillar.title, pillar.body, pillar.note)
  doc.fillColor(colors.ink).font('Helvetica-Bold').fontSize(18).text(pillar.stat, leftX + 174, cardY + 18, { width: 40, align: 'right' })
})

sectionTitle('Delivery and support standards', null, 492)
bulletList(
  [
    'Orders are packed in plain, unmarked boxes to protect customer privacy.',
    'Tracking and order confirmation messages should be added as the backend evolves.',
    'Customer support is designed to respond quickly on WhatsApp and email.',
  ],
  margins,
  528,
  usableWidth * 0.92,
  { bulletColor: colors.moss, fontSize: 9.2, gapAfter: 10 }
)

// Page 4

doc.addPage({ margins: { top: margins, left: margins, bottom: margins, right: margins } })
fillBackground(colors.cream)
topBand('Roadmap & Accountability', 'The next improvements that will make the report even more complete and business-ready.')

sectionTitle('What comes next', null, 152)
const roadmap = [
  { title: 'Live order tracking', body: 'Connect the order-tracking page to real transaction and shipping events from the backend.' },
  { title: 'Automated customer updates', body: 'Send order confirmation, shipping, and delivery messages via WhatsApp or SMS.' },
  { title: 'Supplier transparency', body: 'Publish supplier and material sourcing details in a cleaner table format over time.' },
  { title: 'Annual comparison', body: 'Track year-on-year improvements in packaging, water use, and customer service response.' },
]

roadmap.forEach((item, index) => {
  const y = 188 + index * 92
  doc.roundedRect(margins, y, usableWidth, 74, 14).fillAndStroke('#FFFFFF', colors.line)
  doc.fillColor(colors.burgundy).font('Helvetica-Bold').fontSize(8).text(`0${index + 1}`, margins + 16, y + 14, { width: 26 })
  doc.fillColor(colors.ink).font('Times-Bold').fontSize(16).text(item.title, margins + 50, y + 10, { width: usableWidth - 66 })
  doc.fillColor(colors.softText).font('Helvetica').fontSize(9.2).text(item.body, margins + 50, y + 34, { width: usableWidth - 66, lineGap: 3 })
})

const contactY = 560
doc.roundedRect(margins, contactY, usableWidth, 150, 18).fillAndStroke(colors.ink, colors.ink)
doc.fillColor('#F7EFE4').font('Helvetica-Bold').fontSize(8).text('CONTACT', margins + 18, contactY + 18, { width: 60, characterSpacing: 1.5 })
doc.fillColor('#FFFFFF').font('Times-Bold').fontSize(20).text('Aura Intimates', margins + 18, contactY + 38, { width: 240 })
doc.fillColor('#EDE4D8').font('Helvetica').fontSize(9.5).text('Westlands, Nairobi, Kenya\nicardiowen254@gmail.com\nWhatsApp: +254 742 184 483', margins + 18, contactY + 68, { width: 220, lineGap: 4 })
doc.fillColor('#EDE4D8').font('Helvetica').fontSize(9.5).text('This report is designed in-house to match the Aura brand palette and feel, without borrowing another company’s copyrighted design.', margins + 270, contactY + 50, { width: usableWidth - 288, lineGap: 4.4 })

// Final page numbers
const range = doc.bufferedPageRange()
for (let i = range.start; i < range.start + range.count; i += 1) {
  doc.switchToPage(i)
  drawFooter(i + 1, range.count)
}

doc.end()

stream.on('finish', () => {
  process.stdout.write(`Generated ${outputPath}\n`)
})
