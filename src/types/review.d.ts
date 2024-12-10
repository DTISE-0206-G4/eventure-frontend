export interface Review {
  id: number;
  event: EventReview;
  user: UserReview;
  stars: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface EventReview {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

export interface UserReview {
  id: number;
  name: string;
  email: string;
}
