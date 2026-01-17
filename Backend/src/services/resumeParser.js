import path from "path";
import fs from "fs";
import mammoth from "mammoth";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export const parseResume = async (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error("Uploaded file not found");
  }

  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value.trim();
  }

  if (ext === ".pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text.trim();
  }

  throw new Error("Unsupported file format");
};

