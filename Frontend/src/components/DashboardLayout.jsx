import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            CruxCV
          </Typography>

          {/* 🔐 AUTH ACTIONS */}
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/signup")}
              >
                Register
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f4f6fb",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </>
  );
}
