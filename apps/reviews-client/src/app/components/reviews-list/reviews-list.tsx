import React, { useEffect, useState } from 'react';
import TaskIcon from '@mui/icons-material/Task';
import {
	Alert,
	Box,
	Card,
	CircularProgress,
	Pagination,
	Rating,
	useMediaQuery,
	useTheme,
} from '@mui/material';

export interface Review {
	createdOn: string;
	id: number;
	rating: number;
	reviewText: string;
	company: {
		name: string;
	};
	user: {
		firstName: string;
		lastName: string;
	};
}
export interface ReviewsListProps {
	reviews?: Review[];
}

export function ReviewsList(props: ReviewsListProps) {
	const [reviews, setReviews] = useState<Review[]>(props.reviews || []);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const reviewsPerPage = 10;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		// Fetch the reviews data when the component mounts
		async function fetchReviews() {
			try {
				const response = await fetch('/api/reviews');
				if (response.ok) {
					const data = await response.json();
					//set the reviews in state
					setReviews(
						data.reviews.map((review: { createdOn: string | number | Date }) => ({
							...review,
							//Change format from raw timestamp to mm/dd/yyyy format
							createdOn: new Date(review.createdOn).toLocaleDateString('en-US'),
						})),
					);
				} else {
					throw new Error('Failed to fetch reviews');
				}
			} catch (error) {
				console.error('Error fetching reviews:', error);
			} finally {
				setLoading(false);
			}
		}
		fetchReviews();
	}, []);

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
			{loading ? (
				//Show loading spinner in loading state
				<Box
					sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}
				>
					<CircularProgress />
				</Box>
			) : reviews.length === 0 ? (
				// Show Alert if no reviews available after loading
				<Alert severity="info" icon={<TaskIcon />}>
					No reviews available
				</Alert>
			) : (
				<div>
					<h1>Reviews</h1>
					<Box sx={{ width: isMobile ? '100%' : '75%', mb: 5 }}>
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
							sx={{ width: isMobile ? '350px' : '100%', mt: 2 }}
						/>
					</Box>
				</div>
			)}
		</div>
	);
}

export default ReviewsList;
