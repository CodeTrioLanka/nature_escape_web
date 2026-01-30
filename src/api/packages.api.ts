export interface Package {
    _id: string;
    packageName: string;
    slug: string;
    tourCategory: string;
    hero: {
        title: string;
        description: string;
        backgroundImage: string;
    };
    overview: {
        duration: {
            days: number;
            nights: number;
        };
        groupSize: string;
    };
    itinerary: {
        day: number;
        title: string;
        activities: string[];
        description: string;
        accommodation?: string;
        meals: {
            breakfast: boolean;
            lunch: boolean;
            dinner: boolean;
        };
    }[];
    galleries: {
        title: string;
        images: string[];
    }[];
    isActive: boolean;
    featured: boolean;
    displayOrder: number;
}

interface PackagesResponse {
    packages: Package[];
}

export const fetchPackagesByCategoryId = async (categoryId: string): Promise<Package[]> => {
    try {
        const baseUrl = import.meta.env.VITE_BASE_URI || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/packages/category/${categoryId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }

        const data: PackagesResponse = await response.json();
        return data.packages || [];
    } catch (error) {
        console.error('API Error fetching packages:', error);
        throw error;
    }
};

interface SinglePackageResponse {
    package: Package;
}

export const fetchPackageBySlug = async (slug: string): Promise<Package> => {
    try {
        const baseUrl = import.meta.env.VITE_BASE_URI || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/packages/slug/${slug}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SinglePackageResponse = await response.json();
        return data.package;
    } catch (error) {
        console.error('API Error fetching package by slug:', error);
        throw error;
    }
};
