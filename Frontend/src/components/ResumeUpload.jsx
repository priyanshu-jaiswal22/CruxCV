import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { uploadResume } from "../services/api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please select a PDF or DOCX file");
      return;
    }

    // Frontend validation
    if (
      !["application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        .includes(file.type)
    ) {
      setError("Only PDF or DOCX files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB");
      return;
    }

    try {
      setLoading(true);
      const response = await uploadResume(file);

      // ✅ Correct axios response handling
      setResult(response.data.result);
    } catch (err) {
      setError("Upload or AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Typography variant="h6" fontWeight={600} mb={1}>
        Upload your resume
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Upload a PDF or DOCX file to get AI-powered resume feedback.
      </Typography>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            Select Resume
            <input
              type="file"
              hidden
              accept=".pdf,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>

          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {file.name}
            </Typography>
          )}

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Analyzing...
                </>
              ) : (
                "Upload & Analyze"
              )}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* ===== AI RESULT ===== */}
      {result && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            AI Resume Analysis
          </Typography>

          {/* Summary */}
          <Typography variant="subtitle1" fontWeight={600}>
            Professional Summary
          </Typography>
          <Typography variant="body2" mb={2}>
            {result.summary}
          </Typography>

          {/* Skills */}
          <Typography variant="subtitle1" fontWeight={600}>
            Suggested Skills
          </Typography>
          <ul>
            {result.skills?.length ? (
              result.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))
            ) : (
              <li>No skill suggestions</li>
            )}
          </ul>

          {/* Improvements */}
          <Typography variant="subtitle1" fontWeight={600} mt={2}>
            Improvement Points
          </Typography>
          <ul>
            {result.improvements?.length ? (
              result.improvements.map((item, i) => (
                <li key={i}>{item}</li>
              ))
            ) : (
              <li>No improvement suggestions</li>
            )}
          </ul>
        </Paper>
      )}
    </Box>
  );
}
