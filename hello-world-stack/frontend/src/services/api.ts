import { HelloResponse } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const fetchHelloMessage = async (): Promise<HelloResponse> => {
    const response = await fetch(`${API_BASE_URL}/hello/`);
    if (!response.ok) {
        throw new Error('Failed to fetch hello message');
    }
    return response.json();
};
