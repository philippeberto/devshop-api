import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './category.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async create(input: Category): Promise<Category> {
    return this.categoryRepository.save(input)
  }

  async delete(id: string): Promise<Boolean> {
    let result = false
    try {
      await this.categoryRepository.delete(id)
      result = true
    } catch (err) {
      console.log(err)
    }
    return result
  }
}
