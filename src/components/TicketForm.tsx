import { useState } from "react";
import { Ticket } from "../types/types";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";

interface TicketFormProps {
  onSubmit: (
    ticket: Omit<
      Ticket,
      "id" | "status" | "createdBy" | "createdAt" | "updatedAt" | "assignedTo"
    >
  ) => void;
}

export const TicketForm = ({ onSubmit }: TicketFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [priority, setPriority] = useState<
    "low" | "medium" | "high" | "critical"
  >("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, difficulty, priority });
    setTitle("");
    setDescription("");
    setDifficulty("easy");
    setPriority("medium");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", p: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        Create New Ticket
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Difficulty</InputLabel>
        <Select
          value={difficulty}
          label="Difficulty"
          onChange={(e) =>
            setDifficulty(e.target.value as "easy" | "medium" | "hard")
          }
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          label="Priority"
          onChange={(e) =>
            setPriority(
              e.target.value as "low" | "medium" | "high" | "critical"
            )
          }
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Ticket
      </Button>
    </Box>
  );
};
