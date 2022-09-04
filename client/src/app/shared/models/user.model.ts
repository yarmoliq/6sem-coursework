import { UserRole } from './user-role-for-note.model';

export interface User {
  userName: string;
  email: string;
  token: string;
  role: UserRole;
}
