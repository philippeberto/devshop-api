import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ loadRelationIds: true })
  }

  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne(id, { loadRelationIds: true })
  }

  async findBySlug(slug: string): Promise<Product> {
    return this.productRepository.findOne({ where: [{ slug }] })
  }

  async create(input: Product): Promise<Product> {
    return this.productRepository.save(input)
  }

  async update(input: Product): Promise<Product> {
    await this.productRepository.update(input.id, {
      name: input.name,
      description: input.description,
      category: input.category,
      slug: input.slug
    })
    return input
  }

  async delete(id: string): Promise<Boolean> {
    let result = false
    try {
      await this.productRepository.delete(id)
      result = true
    } catch (err) {
      console.log(err)
    }
    return result
  }
}