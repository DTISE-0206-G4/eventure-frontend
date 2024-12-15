export interface EventDatatableResponse {
  recordsFiltered: number;
  data: Event[];
  recordsTotal: number;
}

export interface Event {
  id: number;
  user: UserEvent;
  title: string;
  tickets: Ticket[];
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: string | null;
  categories: Category[];
  eventDiscounts: EventDiscount[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface UserEvent {
  id: number;
  name: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface EventDatatableRequest {
  start: number;
  length: number;
  search: string | null;
  userId: number | null;
  category: string;
}

export interface Ticket {
  id: number;
  eventId: number;
  name: string;
  price: number;
  availableSeat: number;
  soldSeat: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isReleased: boolean;
  isClosed: boolean;
}
