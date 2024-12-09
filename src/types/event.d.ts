export interface EventDatatableResponse {
  recordsFiltered: number;
  data: Event[];
  draw: number;
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
  categories: Category[];
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
  draw: number;
  start: number;
  length: number;
  search: string | null;
  orderDir: string;
  orderColumn: string;
  userId: number | null;
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
