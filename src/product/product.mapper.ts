import { Category } from 'src/category/category.entity'
import { ProductCreateInput } from './dto/product-create.input'
import { ProductUpdateInput } from './dto/product-update.input'
import { ProductPublic } from './dto/product'
import { Product } from './product.entity'

export class ProductMappper {
  public static toEntity(input: ProductCreateInput): Product {
    const entity = new Product()
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description
    const category = new Category()
    category.id = input.category
    entity.category = category
    return entity
  }

  public static toEntityUpdate(input: ProductUpdateInput): Product {
    const entity = new Product()
    entity.id = input.id
    entity.name = input.name
    entity.slug = input.slug
    entity.description = input.description
    const category = new Category()
    category.id = input.category
    entity.category = category
    return entity
  }

  public static fromEntityToPublic(entity: Product): ProductPublic {
    const publicProduct = new ProductPublic()
    publicProduct.id = entity.id
    publicProduct.name = entity.name
    publicProduct.slug = entity.slug
    publicProduct.description = entity.description
    publicProduct.category = entity.category.id
    return publicProduct
  }
}
