import { parseResume } from "../services/resumeParser.js";
import { analyzeResume } from "../services/aiService.js";
import { parseAIOutput } from "../utils/parseAIOutput.js";
import Resume from "../models/Resume.js";

import { generateResumePDF } from "../utils/pdfGenerator.js";

export const uploadResume = async (req, res) => {
  try {
    const resumeText = await parseResume(req.file.path);
    const rawAI = await analyzeResume(resumeText);
    const structured = parseAIOutput(rawAI);
    console.log("STRUCTURED AI RESULT:", structured);

    const saved = await Resume.create({
      user: req.userId, 
      originalText: resumeText,
      aiAnalysis: structured
    });

    res.status(201).json({
      message: "Resume analyzed",
      result: structured
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadResumePDF = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    generateResumePDF(resume.aiAnalysis, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};