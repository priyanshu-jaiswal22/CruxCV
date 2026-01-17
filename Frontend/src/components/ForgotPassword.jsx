import * as React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
  Typography,
} from "@mui/material";

function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) return;

    setLoading(true);

    // UI-only simulation (backend not implemented)
    setTimeout(() => {
      setMessage(
        "If an account with this email exists, a password reset link has been sent."
      );
      setLoading(false);
    }, 1000);
  };

  const handleDialogClose = () => {
    setEmail("");
    setMessage("");
    setLoading(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>Reset your password</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DialogContentText>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </DialogContentText>

        <OutlinedInput
          autoFocus
          required
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && (
          <Typography color="success.main" variant="body2">
            {message}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleDialogClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={loading || !!message}
        >
          {loading ? "Sending..." : "Continue"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
