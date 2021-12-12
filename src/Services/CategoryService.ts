import { CategoryRepository } from "../Data/Repositories/CategoryRepository";

const categoryRepository = new CategoryRepository();

export class CategoryService {
    async addCategory(name: string, imgUrl: string) {
        return await categoryRepository.insert({
            name,
            imgUrl
        });
    }

    async getAll() {
        return await categoryRepository.selectAll();
    }
}