import { CategoryRepository } from "../Data/Repositories/CategoryRepository";

const categoryRepository = new CategoryRepository();

export class CategoryService {
    async addCategory(name: string) {
        return await categoryRepository.insert(name);
    }

    async getAll() {
        return await categoryRepository.selectAll();
    }
}