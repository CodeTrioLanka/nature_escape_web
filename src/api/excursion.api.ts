export interface ExcursionFilters {
    time: string[];
    destination: string[];
    category: string[];
}

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
