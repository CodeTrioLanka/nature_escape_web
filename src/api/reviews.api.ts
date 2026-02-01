export interface Review {
    _id: string;
    name: string;
    email?: string;
    rating: number;
    reviewText: string;
    avatarUrl?: string;
    reviewDate?: string;
    source: 'google' | 'user' | 'admin';
    isApproved: boolean;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    ratingCounts: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
}

export interface SubmitReviewData {
    name: string;
    email?: string;
    rating: number;
    reviewText: string;
}

const getBaseUrl = () => import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Get public approved reviews
export const fetchPublicReviews = async (): Promise<Review[]> => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/reviews/public`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('API Error fetching reviews:', error);
        throw error;
    }
};

// Get review statistics
export const fetchReviewStats = async (): Promise<ReviewStats | null> => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/reviews/stats`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data || null;
    } catch (error) {
        console.error('API Error fetching review stats:', error);
        throw error;
    }
};

// Submit a new review
export const submitReview = async (reviewData: SubmitReviewData): Promise<Review> => {
    try {
        const response = await fetch(`${getBaseUrl()}/api/reviews/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('API Error submitting review:', error);
        throw error;
    }
};
