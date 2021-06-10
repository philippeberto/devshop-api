import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Brand')
export class BrandPublic {
  @Field()
  id: string
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  slug: string
}
