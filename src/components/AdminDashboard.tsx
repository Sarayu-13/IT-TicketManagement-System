import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Ticket } from "../types/types";
import { TicketList } from "./TicketList";
import { Box, Typography, Paper, Tabs, Tab } from "@mui/material";

// Mock API calls
const mockGetAllTickets = () => {
  const tickets: Ticket[] = [
    {
      id: "1",
      title: "Login issue",
      description: "Cannot login to the system",
      status: "resolved",
      createdBy: "user1",
      assignedTo: "ai",
      createdAt: new Date("2023-05-01"),
      updatedAt: new Date("2023-05-02"),
      difficulty: "easy",
      priority: "high",
      resolutionComment: "Reset password and it worked",
    },
    {
      id: "2",
      title: "Payment problem",
      description: "Payment not going through",
      status: "assigned_to_admin",
      createdBy: "user2",
      assignedTo: "admin",
      createdAt: new Date("2023-05-10"),
      updatedAt: new Date("2023-05-10"),
      difficulty: "hard",
      priority: "critical",
    },
    {
      id: "3",
      title: "UI glitch",
      description: "Buttons not aligned properly",
      status: "assigned_to_ai",
      createdBy: "user1",
      assignedTo: "ai",
      createdAt: new Date("2023-05-15"),
      updatedAt: new Date("2023-05-15"),
      difficulty: "easy",
      priority: "low",
    },
  ];
  return Promise.resolve(tickets);
};

export const AdminDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    mockGetAllTickets().then(setTickets);
  }, []);

  const filteredTickets =
    tabValue === 0
      ? tickets
      : tabValue === 1
      ? tickets.filter((t) => t.status !== "resolved")
      : tickets.filter((t) => t.status === "resolved");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ticket Management
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
        >
          <Tab label="All Tickets" />
          <Tab label="Open Tickets" />
          <Tab label="Resolved Tickets" />
        </Tabs>
      </Paper>

      <TicketList tickets={filteredTickets} />
    </Box>
  );
};
