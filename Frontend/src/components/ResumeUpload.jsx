import { useState } from "react";
import { uploadResume } from "../services/api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file");

    try {
      setLoading(true);
      setError("");
      const data = await uploadResume(file);
      setResult(data.result);
    } catch (err) {
      setError("Upload or analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>ResumeCritic.ai</h2>
      <p>Upload your resume and get AI-powered feedback</p>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Upload Resume"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ===== AI RESULT RENDERING ===== */}
      {result && (
        <div style={{ marginTop: "30px" }}>
          <h3>🔍 AI Resume Analysis</h3>

          {/* Summary */}
          <div style={{ marginBottom: "20px" }}>
            <h4>Professional Summary</h4>
            <p>{result.summary}</p>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: "20px" }}>
            <h4>Suggested Skills</h4>
            <ul>
              {result.skills && result.skills.length > 0 ? (
                result.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <li>No skill suggestions</li>
              )}
            </ul>
          </div>

          {/* Improvements */}
          <div>
            <h4>Improvement Points</h4>
            <ul>
              {result.improvements && result.improvements.length > 0 ? (
                result.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <li>No improvement suggestions</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
