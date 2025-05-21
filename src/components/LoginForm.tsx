import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(username, password);
    if (success) {
      navigate(user?.role === "admin" ? "/admin" : "/user");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const payload = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );
      const success = await googleLogin(payload);
      if (success) {
        navigate("/user");
      }
    } catch (error) {
      setError("Google login failed");
      console.error(error);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Login to Your Account
        </Typography>
        {error && (
          <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2, py: 1.5 }}
          >
            Sign In
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Stack spacing={2}>
          <Box width="100%">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              shape="rectangular"
              size="large"
              text="signin_with"
              logo_alignment="left"
            />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
