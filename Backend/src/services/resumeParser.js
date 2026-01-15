import path from "path";
import mammoth from "mammoth";

export const parseResume = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  if (ext === ".pdf") {
    // TEMP: disable PDF parsing
    return "PDF parsing disabled temporarily. Use DOCX for now.";
  }

  throw new Error("Unsupported file format");
};

