export type RequestLog = {
    id: number;
    timestamp: string;
};

export type HelloResponse = {
    message: string;
    access_logs: RequestLog[];
};
