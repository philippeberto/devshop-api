import { Field, InputType } from '@nestjs/graphql'
import { Length, Matches, Validate } from 'class-validator'
import { ProductIsSlugUnique } from 'src/product/validations/productIsSlugUnique'

@InputType()
export class ProductCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(ProductIsSlugUnique)
  slug: string

  @Field()
  @Length(10)
  description: string

  @Field()
  @Length(3)
  category: string
}