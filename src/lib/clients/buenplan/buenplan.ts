import axios from 'axios';


interface BuenPlanResponse<T> {
  data: T;
  success: boolean;
  statusCode: number;
}
export class BuenPlanAPI {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  public async post<T>(path: string, body: any, headers?: {[name: string]: string}): Promise<BuenPlanResponse<T>> {
    const reqHeaders = {
      ...headers,
      accept: 'application/json',
      "Content-Type": 'application/json',
      'Authorization': `${this.apiKey}`
    };

    try {
      const response = await axios.post<T>(`${this.baseUrl}${path}`, body, { headers: reqHeaders });

      return {
        data: response.data as T,
        success: response.status >= 200 && response.status < 400,
        statusCode: response.status
      };
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

}