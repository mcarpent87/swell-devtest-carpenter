import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResponse, ReviewsCountResponse, ReviewExt } from './reviews.types';
import { Review, Company, User } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
	constructor(private reviewsService: ReviewsService) {}
	//Reviews GET
	@Get()
	async getReviews(): Promise<ReviewsResponse> {
		const reviews: Review[] = await this.reviewsService.getReviewsWithDetails();
		const reviewsWithDetails: ReviewExt[] = [];

		for (const review of reviews) {
			const company: Company | null = await this.reviewsService.getCompanyById(review.companyId);
			const user: User | null = await this.reviewsService.getUserById(review.reviewerId);

			if (company && user) {
				const reviewWithDetails: ReviewExt = {
					...review,
					company: {
						id: company.id,
						name: company.name,
					} as Company & { id: string; name: string },
					user: {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
					} as User & { id: string; firstName: string; lastName: string },
				};
				reviewsWithDetails.push(reviewWithDetails);
			}
		}

		// Sort reviews by createdOn date in descending order
		reviewsWithDetails.sort((a, b) => {
			return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
		});

		return { reviews: reviewsWithDetails };
	}
	//Reviews count GET
	@Get('/count')
	async getReviewsCount(): Promise<ReviewsCountResponse> {
		const reviewsCount = await this.reviewsService.getReviewsCount();
		return { reviewsCount };
	}
}
