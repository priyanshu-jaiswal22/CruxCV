import { parseResume } from "../services/resumeParser.js";
import { analyzeResume } from "../services/aiService.js";
import { parseAIOutput } from "../utils/parseAIOutput.js";
import Resume from "../models/Resume.js";
import { generateResumePDF } from "../utils/pdfGenerator.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    const resumeText = await parseResume(req.file.path);
    // const rawAI = await analyzeResume(resumeText);
    // const structured = parseAIOutput(rawAI);

    const structured = {
      summary: "Test summary",
      skills: ["Test skill"],
      improvements: ["Test improvement"],
    };

    const saved = await Resume.create({
      user: req.userId,
      originalText: resumeText,
      aiAnalysis: structured,
    });

    res.status(201).json({
      message: "Resume analyzed",
      result: structured,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Resume processing failed" });
  }
};


export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

export const downloadResumePDF = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    generateResumePDF(resume.aiAnalysis, res);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};
