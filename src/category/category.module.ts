//O Module irá unir demais classes
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryResolver } from './category.resolver'
import { CategoryService } from './category.service'
import { Category } from './category.entity'
import { CategoryIsSlugUnique } from './validations/categoryIsSlugUnique'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver, CategoryIsSlugUnique]
})
export class CategoryModule { }
