export interface AboutUsHero {
    heroBackground: string;
    heroTitle: string;
    heroDescription: string;
}

export interface AboutUsStats {
    yearExperience: number;
    happyTravelers: number;
    toursCompleted: number;
    destination: number;
}

export interface AboutUsMilestone {
    year: number;
    event: string;
    mstone_description: string;
}

export interface AboutUsValue {
    icon: string;
    title: string;
    description: string;
    color: string;
}

export interface AboutUsTeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
}

export interface AboutUsData {
    _id?: string;
    hero: AboutUsHero;
    stats: AboutUsStats;
    milestones: AboutUsMilestone[];
    values: AboutUsValue[];
    team: AboutUsTeamMember[];
    createdAt?: string;
    updatedAt?: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: AboutUsData[];
}

export const fetchAboutUsData = async (): Promise<AboutUsData | null> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/aboutus/getData`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }

        const result: ApiResponse = await response.json();

        // Return the first data item if available, otherwise null
        if (result.success && result.data && result.data.length > 0) {
            return result.data[0];
        }

        return null;
    } catch (error) {
        console.error('API Error fetching About Us data:', error);
        throw error;
    }
};
