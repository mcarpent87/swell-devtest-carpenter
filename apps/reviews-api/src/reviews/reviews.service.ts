import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Review, Company, User } from '@prisma/client';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}
	//get review data
	async getReviewsWithDetails(): Promise<Review[]> {
		return this.prisma.review.findMany({
			include: {
				user: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
				company: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	}
	//Get company data
	async getCompanyById(companyId: string): Promise<Company | null> {
		return this.prisma.company.findUnique({
			where: {
				id: companyId,
			},
		});
	}
	//get user data
	async getUserById(userId: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
	}

	getReviewsCount() {
		return this.prisma.review.count();
	}
}
