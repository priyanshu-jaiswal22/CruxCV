import { Paper, Typography } from "@mui/material";

export default function SectionCard({ title, children }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
