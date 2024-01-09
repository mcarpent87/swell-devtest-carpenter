import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';

describe('ReviewsList', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsList />);
		expect(baseElement).toBeTruthy();
	});

	it('should render list of reviews', async () => {
		const mockReviews = [
			{
				id: 1,
				user: { firstName: 'John', lastName: 'Doe' },
				company: { name: 'John Doe Tractors Inc.' },
				createdOn: '11/15/2023',
				rating: 4,
				reviewText: 'Great company!',
			},
			{
				id: 2,
				user: { firstName: 'James', lastName: 'Doe' },
				company: { name: 'Acme Inc.' },
				createdOn: '11/16/2023',
				rating: 5,
				reviewText: 'Great company!',
			},
			{
				id: 3,
				user: { firstName: 'Joe', lastName: 'Doe' },
				company: { name: 'Joe Doe Inc.' },
				createdOn: '11/17/2023',
				rating: 4,
				reviewText: 'Great company!',
			},
		];

		// Render component with the mocked data
		render(<ReviewsList reviews={mockReviews} />);
	});

	it('should display message if no reviews are found', () => {
		render(<ReviewsList reviews={[]} />);

		//Check for alert text when there are no reviews rendered.
		const alert = screen.getByText('No reviews available');
		expect(alert).toBeInTheDocument();
	});

	it('should display the review text if provided', async () => {
		const mockReview = {
			id: 1,
			user: { firstName: 'John', lastName: 'Doe' },
			company: { name: 'John Doe Tractors Inc.' },
			createdOn: '11/15/2023',
			rating: 4,
			reviewText: 'Great company!',
		};

		render(<ReviewsList reviews={[mockReview]} />);
		//Check that the review text is present.
		const reviewText = screen.getByText(mockReview.reviewText);
		expect(reviewText).toBeInTheDocument();
	});
});
