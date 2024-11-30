/* eslint-disable @typescript-eslint/no-explicit-any */
import AppException from '@/exception/app_exception';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import type HttpService from '../http_service';



export default class HttpServiceImpl implements HttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = import.meta.env.VITE_API_BASE_URL, token: string = import.meta.env.VITE_API_TOKEN) {
    this.axiosInstance = axios.create({
      baseURL, headers: {
        "Authorization": `Basic ${token}`
      }
    });
  }

  async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error) {
      if (this.isAxiosError(error)) {
        this.handleHttpError(error);
      }
      throw error;
    }
  }

  async post<T = any>(url: string, data: any, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, { params });
      return response.data;
    } catch (error) {
      if (this.isAxiosError(error)) {
        this.handleHttpError(error);
      }
      throw error;
    }
  }

  async put<T = any>(url: string, data: any, params?: Record<string, any>): Promise<T> {

    try {

      const response = await this.axiosInstance.patch<T>(url, data, { params });
      return response.data;
    } catch (error) {
      if (this.isAxiosError(error)) {
        this.handleHttpError(error);
      }
      throw error;
    }
  }

  async delete<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, { params });
      return response.data;
    } catch (error) {
      if (this.isAxiosError(error)) {
        this.handleHttpError(error);
      }
      throw error;
    }
  }
  private isAxiosError(error: unknown): error is AxiosError {
    return axios.isAxiosError(error);
  }

  private handleHttpError(error: AxiosError): never {
    if (error.response) {

      const status = error.response.status;
      const statusText = error.response.statusText;
      const data = error.response.data as any;

      // Mensagem personalizada com base no conteúdo da resposta
      const message = data?.message || `HTTP ${status}: ${statusText}`;
      const type = data?.type || 'UnknownError';

      throw new AppException(
        type,
        message,
        error.stack
      );
    } else if (error.request) {

      throw new AppException(
        'HttpRequestError',
        'No response received from the server. Please check your connection or try again later.',
        error.stack
      );
    } else {

      throw new AppException(
        'HttpClientError',
        `Unexpected error: ${error.message}`,
        error.stack
      );
    }
  }

}


