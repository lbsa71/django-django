export type Customer = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
};

export type OperationLog = {
    id: number;
    timestamp: string;
    operation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
    customer: number | null;
    details: string;
};

export type CreateCustomerData = Pick<Customer, 'name' | 'email'>;
export type UpdateCustomerData = Partial<CreateCustomerData>;
