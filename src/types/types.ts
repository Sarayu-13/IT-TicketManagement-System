export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'assigned_to_ai' | 'assigned_to_admin' | 'resolved';
  createdBy: string;
  assignedTo: 'ai' | 'admin' | null;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  resolutionComment?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  email?: string; // For Google email
}

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};