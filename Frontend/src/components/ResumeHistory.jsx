import { useEffect, useState } from "react";
import { fetchResumeHistory } from "../services/api";

export default function ResumeHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResumeHistory()
      .then((res) => {
        setHistory(res.data?.data || []);
      })
      .catch(() => {
        setError("Failed to load history");
      });
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Resume History</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {history.length === 0 && <p>No resumes analyzed yet.</p>}

      {history.map((item) => (
        <div
          key={item._id}
          style={{ border: "1px solid #ddd", padding: 15, marginBottom: 15 }}
        >
          <h4>Summary</h4>
          <p>{item.aiAnalysis?.summary}</p>

          <h4>Skills</h4>
          <ul>
            {(item.aiAnalysis?.skills || []).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h4>Improvements</h4>
          <ul>
            <button
            onClick={() =>
                window.open(
                `http://localhost:5000/api/resume/download/${item._id}`,
                "_blank"
                )
            }
            >
            Download IMPROVED PDF
            </button>

            {(item.aiAnalysis?.improvements || []).map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

