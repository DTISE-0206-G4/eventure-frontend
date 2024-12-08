import { Ticket } from "./event";
import { EventDiscountResponse } from "./eventDiscountType";
import { UserDiscountResponse } from "./userDiscountType";

export interface TransactionsRequest {
  start: number;
  length: number;
}

export interface TransactionDatatableResponse {
  recordsFiltered: number;
  data: Transaction[];
}

export interface Transaction {
  id: number;
  userId: number;
  ticket: TicketTransaction;
  ticketPrice: number;
  totalPrice: number;
  eventDiscounts: EventDiscountTransaction[];
  userDiscounts: UserDiscountTransaction[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface TicketTransaction {
  id: number;
  event: EventTransaction;
  availableSeat: number;
  soldSeat: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  name: string;
  price: number;
  isReleased: boolean;
  isClosed: boolean;
}

export interface EventTransaction {
  id: number;
  userId: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  categories: CategoryTransaction[];
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface CategoryTransaction {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface EventDiscountTransaction {
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

export interface UserDiscountTransaction {
  id: number;
  userId: number;
  name: string;
  description: string;
  amount: number;
  isPercentage: boolean;
  code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  expiredAt: string;
  isUsed: boolean;
}
