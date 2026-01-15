import PDFDocument from "pdfkit";

export const generateResumePDF = (analysis, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Improved_Resume.pdf"
  );

  doc.pipe(res);

  // Title
  doc.fontSize(22).text("Improved Resume", { align: "center" });
  doc.moveDown(2);

  // Summary
  doc.fontSize(16).text("Professional Summary");
  doc.moveDown(0.5);
  doc.fontSize(12).text(analysis.summary);
  doc.moveDown(1.5);

  // Skills
  doc.fontSize(16).text("Skills");
  doc.moveDown(0.5);
  analysis.skills.forEach(skill => {
    doc.fontSize(12).text(`• ${skill}`);
  });
  doc.moveDown(1.5);

  // Improvements
  doc.fontSize(16).text("Improvement Suggestions");
  doc.moveDown(0.5);
  analysis.improvements.forEach(item => {
    doc.fontSize(12).text(`• ${item}`);
  });

  doc.end();
};
