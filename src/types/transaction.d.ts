export interface TransactionsRequest {
  start: number;
  length: number;
}

export interface TransactionsRequestOrg {
  start: number;
  length: number;
  eventId: number;
}

export interface TransactionDatatableResponse {
  recordsFiltered: number;
  data: Transaction[];
}

export interface Transaction {
  id: number;
  user: UserTransaction;
  ticket: TicketTransaction;
  ticketPrice: number;
  totalPrice: number;
  eventDiscounts: EventDiscountTransaction[];
  userDiscounts: UserDiscountTransaction[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface UserTransaction {
  id: number;
  name: string;
  email: string;
}

export interface TicketTransaction {
  id: number;
  event: EventTransaction;
  availableSeat: number;
  soldSeat: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  price: number;
  isReleased: boolean;
  isClosed: boolean;
}

export interface EventTransaction {
  id: number;
  user: UserTransaction;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  categories: CategoryTransaction[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface CategoryTransaction {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
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
  deletedAt: string;
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
  deletedAt: string;
  expiredAt: string;
  isUsed: boolean;
}
