import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Ticket } from "../types/types";
import { TicketList } from "./TicketList";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Mock API calls
const mockGetUserTickets = (userId: string) => {
  const tickets: Ticket[] = [
    {
      id: "1",
      title: "Login issue",
      description: "Cannot login to the system",
      status: "resolved",
      createdBy: userId,
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
      createdBy: userId,
      assignedTo: "admin",
      createdAt: new Date("2023-05-10"),
      updatedAt: new Date("2023-05-10"),
      difficulty: "hard",
      priority: "critical",
    },
  ];
  return Promise.resolve(tickets);
};

export const UserDashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      mockGetUserTickets(user.id).then(setTickets);
    }
  }, [user]);

  const handleTicketCreated = (newTicket: Ticket) => {
    setTickets([...tickets, newTicket]);
  };

  const resolvedTickets = tickets.filter(
    (t) => t.status === "resolved" && t.resolutionComment
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/user/create-ticket")}
        sx={{ mb: 3 }}
      >
        Create New Ticket
      </Button>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Tickets" />
          <Tab label="Past Resolutions" />
        </Tabs>
      </Paper>

      {tabValue === 0 ? (
        <TicketList tickets={tickets} />
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
