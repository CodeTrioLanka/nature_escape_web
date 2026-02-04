export interface ExcursionFilters {
    time: string[];
    destination: string[];
    category: string[];
}

export interface Excursion {
    _id: string;
    title: string;
    image: string;
    description: string;
    category: string;
    time: string;
    destination: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface ExcursionHero {
    _id?: string;
    heroImage: string;
    title: string;
    subtitle: string;
    description: string;
}

export const getExcursionHeroes = async (): Promise<ExcursionHero[]> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/excursion/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: any[] = await response.json();
        // Extract hero sections from all pages (usually just one)
        const heroes: ExcursionHero[] = data.flatMap(doc => doc.excursionHeroes || []);
        return heroes;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getAllExcursions = async (): Promise<Excursion[]> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/excursion/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }

        // The backend returns an array of page documents, each containing an 'excursion' array
        // We need to flatten this into a single array of excursions
        const data: any[] = await response.json();
        const flattenedExcursions: Excursion[] = data.flatMap(doc => doc.excursion || []);

        return flattenedExcursions;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};


export const fetchExcursionFilters = async (): Promise<ExcursionFilters> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/excursion/filters`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        const data: ExcursionFilters = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getExcursionBySlug = async (slug: string): Promise<Excursion> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/excursion/slug/${slug}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        const data: Excursion = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
