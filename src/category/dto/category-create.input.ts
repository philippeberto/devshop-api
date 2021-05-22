import { Field, InputType } from '@nestjs/graphql'
import { Length, Validate } from 'class-validator'
import { CategoryIsSlugUnique } from '../validations/categoryIsSlugUnique'

@InputType()
export class CategoryCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Validate(CategoryIsSlugUnique)
  slug: string
}
