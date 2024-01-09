import { Review, User, Company } from '@prisma/client';

export interface ReviewExt extends Review {
	company: Company & { id: string; name: string };
	user: User & { id: string; firstName: string; lastName: string };
}

export interface ReviewsResponse {
	reviews: ReviewExt[];
}

export interface ReviewsCountResponse {
	reviewsCount: number;
}
