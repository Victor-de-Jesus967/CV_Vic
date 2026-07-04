from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT = Path("output/pdf/CV-Victor-Jimenez.pdf")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

NAVY = colors.HexColor("#050B1C")
BLUE = colors.HexColor("#1478FF")
CYAN = colors.HexColor("#16E0E8")
INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#556174")
PALE = colors.HexColor("#EAF4FF")


def draw_page(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 18 * mm, width, 18 * mm, fill=1, stroke=0)
    canvas.setFillColor(BLUE)
    canvas.rect(0, height - 18 * mm, width * 0.64, 1.8 * mm, fill=1, stroke=0)
    canvas.setFillColor(CYAN)
    canvas.rect(width * 0.64, height - 18 * mm, width * 0.36, 1.8 * mm, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.5)
    footer = f"Víctor J.  ·  Portafolio profesional  ·  Página {doc.page}"
    canvas.drawString(18 * mm, 10 * mm, footer)
    canvas.restoreState()


doc = BaseDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    leftMargin=18 * mm,
    rightMargin=18 * mm,
    topMargin=27 * mm,
    bottomMargin=18 * mm,
    title="CV público - Víctor J.",
    author="Víctor J.",
    subject="Ingeniería en Sistemas Computacionales y desarrollo de software",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="content")
doc.addPageTemplates([PageTemplate(id="cv", frames=frame, onPage=draw_page)])

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=29, leading=32, textColor=NAVY, spaceAfter=3 * mm))
styles.add(ParagraphStyle(name="Role", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=11.5, leading=14, textColor=BLUE, spaceAfter=5 * mm, uppercase=True))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=NAVY, spaceBefore=5 * mm, spaceAfter=2.5 * mm))
styles.add(ParagraphStyle(name="BodyCV", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.5, leading=14, textColor=INK, spaceAfter=2.2 * mm))
styles.add(ParagraphStyle(name="SmallCV", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.7, leading=12.5, textColor=MUTED, spaceAfter=1.5 * mm))
styles.add(ParagraphStyle(name="Item", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.2, leading=13.2, leftIndent=4 * mm, firstLineIndent=-3 * mm, textColor=INK, spaceAfter=1.7 * mm))


def section(title):
    return [Paragraph(title, styles["Section"]), Table([[""]], colWidths=[doc.width], rowHeights=[0.8 * mm], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), PALE), ("LINEBELOW", (0, 0), (-1, -1), 0.8, CYAN)])), Spacer(1, 1.5 * mm)]


story = [
    Paragraph("Víctor J.", styles["Name"]),
    Paragraph("INGENIERO EN SISTEMAS COMPUTACIONALES · DESARROLLO DE SOFTWARE", styles["Role"]),
    Paragraph("Ingeniero en Sistemas Computacionales con experiencia en desarrollo móvil, automatización, aplicaciones web y soluciones de TI. Construyo herramientas funcionales para reducir trabajo manual, organizar información y apoyar mejores decisiones.", styles["BodyCV"]),
    Table(
        [["mijangos.jimenez967@outlook.es", "victordejesus.dev"]],
        colWidths=[doc.width * 0.62, doc.width * 0.38],
        style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), NAVY),
            ("TEXTCOLOR", (0, 0), (-1, -1), colors.white),
            ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]),
    ),
]

story += section("Formación")
story += [
    Paragraph("<b>Ingeniería en Sistemas Computacionales</b> — 2025", styles["BodyCV"]),
    Paragraph("Instituto Tecnológico Superior de Villa La Venta, Tabasco", styles["SmallCV"]),
    Paragraph("<b>Máster en Desarrollo con IA</b> — 2026", styles["BodyCV"]),
    Paragraph("BIGSchool", styles["SmallCV"]),
]

story += section("Proyectos y experiencia aplicada")
projects = [
    ("Gestor de Activos TI", "Aplicación de escritorio para consultar inventario tecnológico, importar información desde Excel, aplicar filtros y generar reportes en PDF y Excel con Python, PyQt5 y SQLite."),
    ("Inventory", "Aplicación Flutter offline para inventario de joyería con autenticación biométrica, QR, clientes, apartados, historial y respaldo local."),
    ("Aforos Pro", "Aplicación Android para registrar lecturas, calcular aforos de líquidos y gas sin conexión y generar reportes PDF."),
    ("Nova Control", "Plataforma web demostrativa para centralizar clientes, mensualidades, pagos, ventas, inventario, seguimiento físico y reportes administrativos."),
    ("Taller Testing HITS", "Sitio web responsive para organizar materiales, videos y recursos de un taller de testing de software."),
]
for name, description in projects:
    story.append(Paragraph(f"• <b>{name}</b> — {description}", styles["Item"]))

story += section("Enfoque profesional")
story += [
    Paragraph("Desarrollo web y móvil · Automatización de procesos · Gestión de datos · Herramientas offline · Soporte TI · Integración de tecnologías", styles["BodyCV"]),
    PageBreak(),
    Paragraph("Tecnologías y habilidades", styles["Name"]),
    Paragraph("CAPACIDADES TÉCNICAS", styles["Role"]),
]

skills = [
    ("Desarrollo web", "HTML · CSS · JavaScript · Git · GitHub"),
    ("Desarrollo móvil", "Flutter · Dart · Android · SQLite · aplicaciones offline"),
    ("Software y datos", "Python · PyQt5 · Pandas · CRUD · SQLite"),
    ("Integraciones", "QR Scanner · autenticación biométrica · validación de datos"),
    ("Reportes y respaldo", "PDF · Excel · CSV · JSON"),
    ("Soporte TI", "Mantenimiento preventivo y correctivo · diagnóstico de hardware · ampliación de RAM y almacenamiento"),
]
skill_rows = [[Paragraph(f"<b>{label}</b>", styles["BodyCV"]), Paragraph(value, styles["BodyCV"])] for label, value in skills]
story.append(Table(skill_rows, colWidths=[doc.width * 0.28, doc.width * 0.72], style=TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("BACKGROUND", (0, 0), (0, -1), PALE),
    ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D4E2F2")),
    ("LEFTPADDING", (0, 0), (-1, -1), 9),
    ("RIGHTPADDING", (0, 0), (-1, -1), 9),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
])))

story += section("Capacitaciones")
training = [
    "Python for Data Science, AI & Development — certificado, 2025",
    "Google AI Essentials — certificado, 2025",
    "Aplicación de Tecnologías de Información — reconocimiento, 2025",
    "Control, Movimiento y Comunicación — constancia, 2023",
    "Fundamentos de Arduino — constancia, 2023",
    "Mantenimiento de PC — constancia, 2021",
    "Optimizando el rendimiento de tu PC — constancia, 2021",
    "Tecnologías de la Información y Comunicación — diploma, 2020",
    "Informática básica — reconocimiento, 2020",
]
for item in training:
    story.append(Paragraph(f"• {item}", styles["Item"]))

story += section("Idiomas")
story += [
    Paragraph("Español — nativo", styles["BodyCV"]),
    Paragraph("Inglés — técnico", styles["BodyCV"]),
]

doc.build(story)
print(OUTPUT.resolve())
