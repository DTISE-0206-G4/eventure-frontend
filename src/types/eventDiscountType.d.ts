export interface EventDiscountResponse {
  id: number;
  eventId: number;
  title: string;
  description: string;
  code: string;
  amount: number;
  isPercentage: boolean;
  available: number;
  used: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  expiredAt: string;
  isReleased: boolean;
  isClosed: boolean;
}
