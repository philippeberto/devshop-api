import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BrandMapper } from './brand.mapper'
import { BrandService } from './brand.service'
import { BrandPublic } from './dto/brand'
import { BrandCreateInput } from './dto/brand-create.input'
import { BrandUpdateInput } from './dto/brand-update.input'
import { GraphQLUpload } from 'graphql-upload'
import { FileUpload } from 'graphql-upload'

// import { Readable } from 'stream'

// export interface FileUpload {
//   filename: string
//   mimetype: string
//   encoding: string
//   createReadStream: () => Readable
// }

@Resolver(of => BrandPublic)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) { }

  @Query(returns => [BrandPublic], { name: 'getAllBrands' })
  async getAllBrands(): Promise<BrandPublic[]> {
    return await this.brandService.findAll()
  }

  @Query(returns => BrandPublic, { name: 'getBrandById' })
  async getBrandById(
    @Args('id') id: string
  ): Promise<BrandPublic> {
    return await this.brandService.findById(id)
  }

  @Query(returns => BrandPublic, { name: 'getBrandBySlug' })
  async getBrandBySlug(
    @Args('slug') slug: string
  ): Promise<BrandPublic> {
    return await this.brandService.findBySlug(slug)
  }

  @Mutation(returns => BrandPublic, { name: 'createBrand' })
  async createBrand(
    @Args('input') input: BrandCreateInput
  ): Promise<BrandPublic> {
    return this.brandService.create(BrandMapper.toEntity(input))
  }

  @Mutation(returns => BrandPublic, { name: 'updateBrand' })
  async updateBrand(
    @Args('input') input: BrandUpdateInput
  ): Promise<BrandPublic> {
    return this.brandService.update(input)
  }

  @Mutation(returns => Boolean, { name: 'uploadBrandLogo' })
  async uploadBrandLogo(
    @Args('id') id: string,
    @Args('file', { type: () => GraphQLUpload })
    file: FileUpload
  ): Promise<boolean> {
    console.log(id)
    console.log(file)
    const { createReadStream, filename, mimetype } = await file
    await this.brandService.uploadBrandLogo(id, createReadStream, filename, mimetype)
    return true
  }

  @Mutation(returns => Boolean, { name: 'deleteBrand' })
  async deleteBrand(
    @Args('id') id: string
  ): Promise<Boolean> {
    return this.brandService.delete(id)
  }
}
