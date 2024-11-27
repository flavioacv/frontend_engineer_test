
import AppException from '@/exception/app_exception';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import type HttpService from '../http_service';



export default class HttpServiceImpl implements HttpService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL, headers: {
                "Authorization": "Bearer "
            }
        });
    }

    async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, { params });
        return response.data;
    }

    async post<T = any>(url: string, data: any, params?: Record<string, any>): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data, { params });
        return response.data;
    }

    async put<T = any>(url: string, data: any, params?: Record<string, any>): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data, { params });
        return response.data;
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
            // Erro com resposta do servidor
            throw new AppException(
                'HttpError',
                `HTTP ${error.response.status}: ${error.response.statusText}`,
                error.stack
            );
        } else if (error.request) {
            // Nenhuma resposta foi recebida
            throw new AppException(
                'HttpRequestError',
                'No response received from the server',
                error.stack
            );
        } else {
            // Erro na configuração da requisição
            throw new AppException(
                'HttpClientError',
                error.message,
                error.stack
            );
        }
    }
}


