export default interface HttpService {
    get<T = any>(url: string, params?: Record<string, any>): Promise<T>;
    post<T = any>(url: string, data: any, params?: Record<string, any>): Promise<T>;
    put<T = any>(url: string, data: any, params?: Record<string, any>): Promise<T>;
    delete<T = any>(url: string, params?: Record<string, any>): Promise<T>;
}