import { Field, InputType } from '@nestjs/graphql'
import { IsUUID, Length, Matches, Validate } from 'class-validator'
import { ProductIsSlugUnique } from '../validations/productIsSlugUnique'

@InputType()
export class ProductUpdateInput {
  @Field()
  @IsUUID()
  id: string

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
  @IsUUID()
  category: string

}