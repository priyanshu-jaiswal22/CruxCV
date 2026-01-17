import PDFDocument from "pdfkit";

export const generateResumePDF = (analysis = {}, res) => {
  const {
    summary = "",
    skills = [],
    improvements = [],
  } = analysis;

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Improved_Resume.pdf"
  );

  doc.pipe(res);

  // Title
  doc
    .fontSize(22)
    .font("Helvetica-Bold")
    .text("Improved Resume", { align: "center" });
  doc.moveDown(2);

  // Summary
  doc.fontSize(16).font("Helvetica-Bold").text("Professional Summary");
  doc.moveDown(0.5);
  doc.fontSize(12).font("Helvetica").text(summary, {
    lineGap: 4,
  });
  doc.moveDown(1.5);

  // Skills
  if (skills.length) {
    doc.fontSize(16).font("Helvetica-Bold").text("Skills");
    doc.moveDown(0.5);
    skills.forEach((skill) => {
      doc.fontSize(12).font("Helvetica").text(`• ${skill}`);
    });
    doc.moveDown(1.5);
  }

  // Improvements
  if (improvements.length) {
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text("Improvement Suggestions");
    doc.moveDown(0.5);
    improvements.forEach((item) => {
      doc.fontSize(12).font("Helvetica").text(`• ${item}`);
    });
  }

  doc.end();
};
