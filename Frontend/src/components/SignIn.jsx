import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import ForgotPassword from "./ForgotPassword";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
    const res = await loginUser({ email, password });

    // ✅ safety check
    if (!res?.data?.token) {
      throw new Error("Token not received");
    }

    // ✅ save token
    localStorage.setItem("token", res.data.token);

    // ✅ redirect to dashboard
    navigate("/dashboard");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    setError("Invalid email or password");
  }
  };

  return (
    <>
      <CssBaseline />

      {/* 🔥 Gradient Background */}
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {/* 🧊 Auth Card */}
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Icon */}
          <Stack alignItems="center" spacing={1} mb={2}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 1.5,
                borderRadius: "50%",
              }}
            >
              <LockOutlinedIcon />
            </Box>

            <Typography variant="h5" fontWeight={600}>
              Sign in to ResumeCritic.ai
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Improve your resume with AI
            </Typography>
          </Stack>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <FormLabel>Email</FormLabel>
              <TextField
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel>Password</FormLabel>
              <TextField
                name="password"
                type="password"
                placeholder="••••••"
                required
              />
            </FormControl>

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Sign In
            </Button>

            <Button
              variant="text"
              onClick={() => setOpen(true)}
              sx={{ mt: 1 }}
            >
              Forgot password?
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Don&apos;t have an account?{" "}
              <Link component="button" onClick={() => navigate("/signup")}>
                Sign up
              </Link>
            </Typography>
          </Box>

          <ForgotPassword open={open} handleClose={() => setOpen(false)} />
        </Paper>
      </Box>
    </>
  );
}
