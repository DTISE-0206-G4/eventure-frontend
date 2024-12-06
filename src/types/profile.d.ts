export interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  description: any;
  profileImage: any;
  referralCode: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
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
