export interface Service {
    _id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface ServiceHero {
    _id: string;
    heroImage: string;
    title: string;
    subtitle: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface ServicesResponse {
    services: Service[];
}

export interface ServiceHeroResponse {
    hero: ServiceHero | null;
}

export const fetchServiceHero = async (): Promise<ServiceHero | null> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/service-hero`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        const data: ServiceHeroResponse = await response.json();
        return data.hero;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchServices = async (): Promise<Service[]> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/service/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        const data: ServicesResponse = await response.json();
        return data.services;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const getServiceById = async (id: string): Promise<Service> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/service/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        const data: { service: Service } = await response.json();
        return data.service;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export interface ServicePageData {
    hero: ServiceHero | null;
    services: Service[];
}

// Fetch complete service page data (hero + services) in one request
export const fetchServicePageData = async (): Promise<ServicePageData> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/service-page`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }
        const data: ServicePageData = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
