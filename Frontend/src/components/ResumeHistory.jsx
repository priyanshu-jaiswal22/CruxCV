import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import API, { fetchResumeHistory } from "../services/api";

export default function ResumeHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetchResumeHistory();
        setHistory(res.data?.data || []);
      } catch {
        setError("Failed to load resume history");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleDownload = async (id) => {
    try {
      setDownloadingId(id);

      const response = await API.get(`/resume/download/${id}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Improved_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download PDF");
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Resume History
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {history.length === 0 && (
        <Typography>No resumes analyzed yet.</Typography>
      )}

      {history.map((item) => (
        <Paper key={item._id} sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Professional Summary
          </Typography>
          <Typography variant="body2" mb={2}>
            {item.aiAnalysis?.summary}
          </Typography>

          <Typography variant="subtitle1" fontWeight={600}>
            Skills
          </Typography>
          <ul>
            {(item.aiAnalysis?.skills || []).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <Typography variant="subtitle1" fontWeight={600} mt={2}>
            Improvements
          </Typography>
          <ul>
            {(item.aiAnalysis?.improvements || []).map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ mt: 2 }}
            disabled={downloadingId === item._id}
            onClick={() => handleDownload(item._id)}
          >
            {downloadingId === item._id
              ? "Downloading..."
              : "Download Improved PDF"}
          </Button>
        </Paper>
      ))}
    </Box>
  );
}
