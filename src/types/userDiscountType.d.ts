export interface UserDiscountResponse {
  id: number;
  userId: number;
  name: string;
  description: string;
  amount: number;
  isPercentage: boolean;
  code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  expiredAt: string;
  isUsed: boolean;
}
