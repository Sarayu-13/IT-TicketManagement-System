import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Ticket } from "../types/types";

interface TicketListProps {
  tickets: Ticket[];
}

export const TicketList = ({ tickets }: TicketListProps) => {
  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return "default";
      case "assigned_to_ai":
        return "info";
      case "assigned_to_admin":
        return "warning";
      case "resolved":
        return "success";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "low":
        return "success";
      case "medium":
        return "info";
      case "high":
        return "warning";
      case "critical":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.description}</TableCell>
              <TableCell>
                <Chip
                  label={ticket.status.replace(/_/g, " ")}
                  color={getStatusColor(ticket.status)}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={ticket.priority}
                  color={getPriorityColor(ticket.priority)}
                />
              </TableCell>
              <TableCell>{ticket.assignedTo || "Not assigned"}</TableCell>
              <TableCell>
                {new Date(ticket.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
