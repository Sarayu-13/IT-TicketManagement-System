// src/components/CreateTicket.tsx
import { useNavigate } from "react-router-dom";
import { TicketForm } from "./TicketForm";
import { useAuth } from "../contexts/AuthContext";
import { Box, Typography, Button } from "@mui/material";

export const CreateTicket = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (ticketData: any) => {
    if (!user) return;

    // Your ticket creation logic here
    console.log("Creating ticket:", ticketData);

    // After creation, navigate back to the user dashboard
    navigate("/user");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Ticket
      </Typography>
      <Button
        variant="outlined"
        sx={{ mb: 3 }}
        onClick={() => navigate("/user")}
      >
        Back to My Tickets
      </Button>
      <TicketForm onSubmit={handleSubmit} />
    </Box>
  );
};
