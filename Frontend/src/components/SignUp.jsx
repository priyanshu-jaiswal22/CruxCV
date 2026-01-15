import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Paper,
  Link,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    try {
      const res = await registerUser({ name, email, password });

      // ✅ Ensure token exists
      if (!res.data.token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("token", res.data.token);

      // ✅ Redirect using router
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <>
      <CssBaseline />

      {/* 🔥 Gradient Background */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
        }}
      >
        {/* 🧊 Signup Card */}
        <Paper
          elevation={12}
          sx={{
            width: "100%",
            maxWidth: 440,
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Stack alignItems="center" spacing={1} mb={2}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 1.5,
                borderRadius: "50%",
              }}
            >
              <PersonAddAlt1Icon />
            </Box>

            <Typography variant="h5" fontWeight={600}>
              Create your account
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Start improving your resume with AI
            </Typography>
          </Stack>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <FormLabel>Full Name</FormLabel>
              <TextField
                name="name"
                placeholder="Your name"
                required
              />
            </FormControl>

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

            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Sign Up
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link component="button" onClick={() => navigate("/login")}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
