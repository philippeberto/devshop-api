import { Field, InputType } from '@nestjs/graphql'
import { Length, Matches, Validate } from 'class-validator'
import { CategoryIsSlugUnique } from '../validations/categoryIsSlugUnique'

@InputType()
export class CategoryCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(CategoryIsSlugUnique)
  slug: string
}
