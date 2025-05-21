import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ticket Management System
        </Typography>
        {user ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar alt={user.username} sx={{ width: 32, height: 32 }} />
            <Typography variant="subtitle1">
              Welcome, <strong>{user.username}</strong>
            </Typography>
            <Button
              color="inherit"
              onClick={logout}
              variant="outlined"
              size="small"
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            variant="outlined"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
