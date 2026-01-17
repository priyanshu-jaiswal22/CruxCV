import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        textAlign: "center",
        px: 2,
      }}
    >
      <Stack spacing={3} maxWidth={700}>
        <Typography variant="h3" fontWeight={700}>
          CruxCV
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          AI-powered resume analysis to help you crack interviews faster.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/signup")}
            sx={{ color: "white", borderColor: "white" }}
          >
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
