import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand } from './brand.entity'
import { Repository } from 'typeorm'
import { S3 } from 'src/utils/s3'

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private s3: S3
  ) { }

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find()
  }

  async findById(id: string): Promise<Brand> {
    return this.brandRepository.findOne(id)
  }

  async findBySlug(slug: string): Promise<Brand> {
    return this.brandRepository.findOne({ where: [{ slug }] })
  }

  async create(input: Brand): Promise<Brand> {
    return this.brandRepository.save(input)
  }

  async uploadBrandLogo(id: string, createReadStream: () => any, filename: string, mimetype: string): Promise<Brand> {
    const stream = createReadStream()
    await this.s3.upload(filename, stream, mimetype, 'devshop-philippe', id + '-' + filename)
    return null
  }

  async update(input: Brand): Promise<Brand> {
    await this.brandRepository.update(input.id, {
      name: input.name,
      slug: input.slug
    })
    return input
  }

  async delete(id: string): Promise<Boolean> {
    let result = false
    try {
      await this.brandRepository.delete(id)
      result = true
    } catch (err) {
      console.log(err)
    }
    return result
  }
}
