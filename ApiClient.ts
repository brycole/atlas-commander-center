import axios from 'axios';

class ApiClient {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async fetchData(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiClient;
