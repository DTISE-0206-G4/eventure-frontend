export interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  description: string;
  profileImage: string;
  referralCode: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangeProfileRequest {
  name: string;
  description: string;
}

export interface ProfileOnEventResponse {
  id: number;
  name: string;
}
