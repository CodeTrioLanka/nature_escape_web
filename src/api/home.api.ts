export interface HomeData {
  title: string;
  subtitle: string;
  year_of_exp: number;
  expert_Team_members: number;
  total_tours: number;
  happy_travelers: number;
  gallery: string[];
  homebg: string;
  homebgVideo: string;
  destinationImage: string;
  personalizedImage: string;
}

interface ApiResponse {
  homes: HomeData[];
}

export const fetchHomeData = async (): Promise<HomeData> => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${baseUrl}/api/home`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const data: ApiResponse = await response.json();
    return data.homes[0];
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


