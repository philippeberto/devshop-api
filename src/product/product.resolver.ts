import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProductPublic } from './dto/product'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductUpdateInput } from './dto/product-update.input'
import { ProductMappper } from './product.mapper'
import { ProductService } from './product.service'

@Resolver(of => ProductPublic)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Query(returns => [ProductPublic], { name: 'getAllProducts' })
  async getAllProducts(): Promise<ProductPublic[]> {
    const products = await this.productService.findAll()
    return products.map(ProductMappper.fromEntityToPublic)
  }

  @Query(returns => ProductPublic, { name: 'getProductById' })
  async getProductById(
    @Args('id') id: string
  ): Promise<ProductPublic> {
    return ProductMappper.fromEntityToPublic(
      await this.productService.findById(id)
    )
  }

  @Mutation(returns => ProductPublic, { name: 'createProduct' })
  async createProduct(
    @Args('input') input: ProductCreateInput
  ): Promise<ProductPublic> {
    return ProductMappper.fromEntityToPublic(
      await this.productService.create(ProductMappper.toEntity(input))
    )
  }

  @Mutation(returns => ProductPublic, { name: 'updateProduct' })
  async updateProduct(
    @Args('input') input: ProductUpdateInput
  ): Promise<ProductPublic> {
    return ProductMappper.fromEntityToPublic(
      await this.productService.update(ProductMappper.toEntity(input))
    )
  }

  @Mutation(returns => Boolean, { name: 'deleteProduct' })
  async deleteProduct(
    @Args('id') id: string
  ): Promise<Boolean> {
    return this.productService.delete(id)
  }
}