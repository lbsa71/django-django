import { Customer, CreateCustomerData, UpdateCustomerData, OperationLog } from '../types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:80/api';

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
};

export const customerApi = {
    list: async (): Promise<Customer[]> => {
        const response = await fetch(`${API_BASE_URL}/customers/`);
        return handleResponse<Customer[]>(response);
    },

    get: async (id: number): Promise<Customer> => {
        const response = await fetch(`${API_BASE_URL}/customers/${id}/`);
        return handleResponse<Customer>(response);
    },

    create: async (data: CreateCustomerData): Promise<Customer> => {
        const response = await fetch(`${API_BASE_URL}/customers/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<Customer>(response);
    },

    update: async (id: number, data: UpdateCustomerData): Promise<Customer> => {
        const response = await fetch(`${API_BASE_URL}/customers/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<Customer>(response);
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/customers/${id}/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
    },
};

export const logApi = {
    list: async (): Promise<OperationLog[]> => {
        const response = await fetch(`${API_BASE_URL}/logs/`);
        return handleResponse<OperationLog[]>(response);
    },
};
