import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Category')
export class CategoryPublic {
  @Field()
  id: string
  @Field({ nullable: true })
  name: string
  @Field({ nullable: true })
  slug: string
}
