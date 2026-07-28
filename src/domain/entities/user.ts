export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredUser extends UserProfile {
  passwordHash: string;
}

export interface AuthSession {
  userId: string;
  email: string;
  loggedInAt: string;
}
