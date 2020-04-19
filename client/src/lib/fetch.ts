import axios from 'axios';
import { useEffect, useState } from 'react';

export class APIClient {
  private token: string;
  constructor(token: string) {
    this.token = token;
  }
  setAuthToken(token: string) {
    this.token = token;
  }
  async post(path: string, body: any, headers?: { [key: string]: string }) {
    const fullUrl = `/api/${path}`;
    const response = await axios.post(fullUrl, body, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...headers,
      },
    });
    return {
      data: response.data,
      status: response.status,
      success: response.status >= 200 && response.status < 400,
    };
  }

  /* dani: Create PUT method */
  async get<T>(path: string, headers?: { [key: string]: string }) {
    const response = await axios.get(`/api/${path}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...headers,
      },
    });
    return {
      data: response.data as T,
      status: response.status,
      success: response.status >= 200 && response.status < 400,
    };
  }
}

function useFetch<T>(path: string, token?: string) {
  const [data, setData] = useState({} as T);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(`/api/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    setData(json as T);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);
  return [data, loading];
}

function usePost(path: string, body: any) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  async function postURL() {
    const response = await fetch(`${path}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const json = await response.json();
    setResponse(json);
    setLoading(false);
  }

  useEffect(() => {
    postURL();
  });

  return [response, loading];
}

export { useFetch, usePost };
