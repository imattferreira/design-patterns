import axios from "axios";

export default interface HttpClient {
  get<T>(url: string): Promise<T>;
}

export class AxiosAdapter implements HttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get(url);

    return response.data;
  }
}

export class FetchAdapter implements HttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    return response.json();
  }
}
