export interface TourCategory {
    _id: string;
    title: string;
    images: string[];
    slug: string;
    description?: string;
    scheduleImage?: string;
    isActive: boolean;
    displayOrder: number;
    createdAt?: string;
    updatedAt?: string;
}

interface ApiResponse {
    tours: TourCategory[];
}

export const fetchTourCategories = async (): Promise<TourCategory[]> => {
    try {
        const baseUrl = import.meta.env.VITE_BASE_URI || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/tours`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }

        const data: ApiResponse = await response.json();

        // Filter active tours and sort by display order
        return data.tours
            .filter(tour => tour.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder);
    } catch (error) {
        console.error('API Error fetching tour categories:', error);
        throw error;
    }
};

export const fetchTourCategoryBySlug = async (slug: string): Promise<TourCategory | undefined> => {
    const categories = await fetchTourCategories();
    return categories.find(cat =>
        cat.slug === slug ||
        cat.slug.trim() === slug.trim() ||
        cat.slug.toLowerCase().trim() === slug.toLowerCase().trim()
    );
};
