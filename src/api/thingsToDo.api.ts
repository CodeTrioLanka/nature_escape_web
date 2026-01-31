export interface ThingsToDoItem {
    _id: string;
    title: string;
    description: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ApiResponse {
    // Based on the controller, it returns the array directly, NOT wrapped in { data: ... } or { success: ... }.
    // See thingsToDo.controller.js: res.status(200).json(activities);
    // Wait, I should double check if the fetch returns array or object.
    // Controller: res.status(200).json(activities); -> It returns [ ... ]
    // So the response IS the array.
}

export const fetchThingsToDo = async (): Promise<ThingsToDoItem[]> => {
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

        const data: ThingsToDoItem[] = await response.json();
        return data;
    } catch (error) {
        console.error('API Error fetching Things To Do data:', error);
        throw error;
    }
};
