import { Review, User, Company } from '@prisma/client';

export interface ReviewExt extends Review {
	company: Company & { id: string; name: string }; // Ensure 'id' is included in the 'company' object
	user: User & { id: string; firstName: string; lastName: string }; // Ensure 'id' is included in the 'user' object
}

export interface ReviewsResponse {
	reviews: ReviewExt[];
}

export interface ReviewsCountResponse {
	reviewsCount: number;
}
