import path from "path";
import mammoth from "mammoth";

export const parseResume = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  // ✅ DOCX parsing (STABLE)
  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value.trim();
  }

  // ❌ PDF disabled (Node 24 incompatibility)
  if (ext === ".pdf") {
    throw new Error("PDF upload temporarily disabled. Please upload DOCX.");
  }

  throw new Error("Unsupported file format");
};
