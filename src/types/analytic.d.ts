export interface AnalyticsResponse {
  totalTicketsSold: number;
  totalRevenue: number;
  ticketSoldData: TicketSoldData[];
  revenueData: RevenueData[];
}

export interface TicketSoldData {
  timeUnit: string;
  ticketsSold: number;
}

export interface RevenueData {
  timeUnit: string;
  revenue: number;
}
