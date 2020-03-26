import axios from 'axios';

export class APIClient {
    private token: string;
    constructor(token: string) {
        this.token = token;
    }
    setAuthToken(token: string) {
        this.token = token;
    }
    async post(path: string, body: any, headers?: {[key: string]: string}) {
        const fullUrl = `${path}`;
        const response = await axios.post(fullUrl, body, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                ...headers
            }
        });
        return {
            data: response.data,
            status: response.status,
            success: response.status >= 200 && response.status < 400
        };
    };

    async get<T>(path: string, headers?: {[key: string]: string}) {
        const response = await axios.get(path, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                ...headers
            }
        });
        return {
            data: response.data as T,
            status: response.status,
            success: response.status >= 200 && response.status < 400
        };
    }
}