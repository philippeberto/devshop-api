import { Field, InputType } from '@nestjs/graphql'
import { Length, Validate } from 'class-validator'
import { CategoryIsSlugUnique } from 'src/category/validations/categoryIsSlugUnique'

@InputType()
export class ProductCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  slug: string

  @Field()
  @Length(10)
  description: string

  @Field()
  @Length(3)
  category: string
}