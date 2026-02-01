export interface HeroItem {
    _id: string;
    heroImage: string;
    title: string;
    subtitle: string;
    description: string;
}

export interface ThingsToDoItem {
    _id: string;
    title: string;
    description: string;
    image: string;
}

export interface ThingsToDoDocument {
    _id: string;
    thingsToDoHeroes: HeroItem[];
    thingsToDo: ThingsToDoItem[];
    createdAt?: string;
    updatedAt?: string;
}

export const fetchThingsToDo = async (): Promise<ThingsToDoDocument[]> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/things-to-do`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }

        const data: ThingsToDoDocument[] = await response.json();
        return data;
    } catch (error) {
        console.error('API Error fetching Things To Do data:', error);
        throw error;
    }
};
