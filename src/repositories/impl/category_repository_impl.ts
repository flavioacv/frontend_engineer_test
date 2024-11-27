import AppException from "@/exception/app_exception";
import type CategoryModel from "@/models/category_model";
import type HttpService from "@/services/http_service/http_service";
import type CategoryRepository from "../category_repository";


export default class CategoryRepositoryImpl implements CategoryRepository {

    private httpService: HttpService;

    constructor(httpService: HttpService) {
        this.httpService = httpService;
    }


    async getCategory(): Promise<CategoryModel[]> {
        try {
            const categories = await this.httpService.get<CategoryModel[]>('/categories');
            return categories;
        } catch (error) {
            if (error instanceof AppException) {
                // Enriquecendo a mensagem de erro com informações sobre o repositório
                throw new AppException(
                    'RepositoryError',
                    `Failed to fetch categories: ${error.message}`,
                    error.stack
                );
            }
            //Re-lança erros não tratados
            throw error;
        }

        // // Lógica para buscar as categorias (ex.: de uma API ou banco de dados)
        // return [
        //     { id: "1", name: 'Category 1', subCategory: [] },
        //     { id: "2", name: 'Category 2', subCategory: [] },
        // ]; // Exemplo de retorno
    }
}