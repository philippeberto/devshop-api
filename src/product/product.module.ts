import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './product.entity'
import { ProductResolver } from './product.resolver'
import { ProductService } from './product.service'
import { ProductIsSlugUnique } from './validations/productIsSlugUnique'


@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductService, ProductResolver, ProductIsSlugUnique]
})

export class ProductModule { }