import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Ticket } from "../types/types";
import { TicketList } from "./TicketList";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

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
      : tabValue === 2
      ? tickets.filter((t) => t.status === "resolved")
      : tickets.filter((t) => t.status === "resolved" && t.resolutionComment);

  const resolvedTickets = tickets.filter(
    (t) => t.status === "resolved" && t.resolutionComment
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ticket Management
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Tickets" />
          <Tab label="Open Tickets" />
          <Tab label="Resolved Tickets" />
          <Tab label="Past Resolutions" />
        </Tabs>
      </Paper>

      <Typography variant="h6" gutterBottom>
        {tabValue === 0 && "All Tickets"}
        {tabValue === 1 && "Open Tickets"}
        {tabValue === 2 && "Resolved Tickets"}
      </Typography>

      {tabValue < 3 ? (
        <TicketList tickets={filteredTickets} />
      ) : (
        <>
          {resolvedTickets.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Title</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Assigned To</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Created</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Resolution</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resolvedTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.description}</TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
                    <TableCell>{ticket.createdAt.toLocaleString()}</TableCell>
                    <TableCell>{ticket.resolutionComment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2" sx={{ p: 2 }}>
              No resolved issues with resolution comments found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};
