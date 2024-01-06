import React, { useEffect, useState } from 'react';
import TaskIcon from '@mui/icons-material/Task';
import { Alert, Box, Card, Pagination, Rating } from '@mui/material';

export interface Review {
	id: number;
	user: {
		firstName: string;
		lastName: string;
	};
	company: {
		name: string;
	};
	createdOn: string;
	rating: number;
	reviewText: string;
}

export interface ReviewsListProps {
	reviews?: Review[]; // Making the reviews prop optional
}

export function ReviewsList(props: ReviewsListProps) {
	const { reviews: initialReviews = [] } = props;
	const [reviews, setReviews] = useState<Review[]>(initialReviews); // Define state to hold reviews data
	const [currentPage, setCurrentPage] = useState(1); // State to track the current page
	const reviewsPerPage = 10; // Number of reviews to display per page

	useEffect(() => {
		// Set initial reviews when component mounts or when the prop changes
		setReviews(initialReviews);
	}, [initialReviews]);

	// Logic to get current reviews for the selected page
	const indexOfLastReview = currentPage * reviewsPerPage;
	const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
	const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

	// Function to handle page change
	const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	return (
		<div>
			{reviews.length === 0 ? ( // Display a message if reviews are empty
				<Alert severity="info" icon={<TaskIcon />}>
					No reviews available
				</Alert>
			) : (
				// Render each review in a card, with pagination
				<div>
					<h1>Reviews</h1>
					{/* TO DO: Make this look better on mobile 100% width on sm screens */}
					<Box sx={{ width: '75%' }}>
						{currentReviews.map((review) => (
							<Card key={review.id} sx={{ p: 3, mt: 4 }}>
								<h4>
									{review.user.firstName} {review.user.lastName}
								</h4>
								<h5>{review.company.name}</h5>
								<p>{review.createdOn}</p>
								<Rating name="read-only" value={review.rating} readOnly />
								<p>{review.reviewText}</p>
							</Card>
						))}
						<Pagination
							count={Math.ceil(reviews.length / reviewsPerPage)}
							page={currentPage}
							color="primary"
							onChange={handlePageChange}
							sx={{ mt: 2 }}
						/>
					</Box>
				</div>
			)}
		</div>
	);
}

export default ReviewsList;
