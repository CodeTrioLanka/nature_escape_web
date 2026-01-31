export interface ContactMessage {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactDetails {
    socials: {
        facebook: string;
        instagram: string;
        twitter: string;
    };
    phone: string[];
    email: string[];
    address: string[];
    googleMap: string;
    bussinessHours?: string[]; // Kept optional as it was in previous schema but missing in sample
}

export const sendMessage = async (messageData: ContactMessage): Promise<void> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            await response.json();
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchContactDetails = async (): Promise<ContactDetails | null> => {
    try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseUrl}/api/contactus`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
        }

        const result = await response.json();
        // Assuming the API returns a standard response structure or the data directly.
        // Based on previous patterns, checking for a 'data' array or 'contact' field.
        // If it's a simple find(), it might be an array.

        // Adapt this based on actual backend response structure
        if (result && Array.isArray(result)) {
            return result[0];
        } else if (result.data && Array.isArray(result.data)) {
            return result.data[0];
        } else if (result.contact) {
            return result.contact;
        }

        return result;

    } catch (error) {
        console.error('API Error fetching contact details:', error);
        return null;
    }
};
