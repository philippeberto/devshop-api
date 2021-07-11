import { Field, InputType } from '@nestjs/graphql'
import { Length, Validate } from 'class-validator'
import { UserIsEmailUnique } from '../validations/userIsEmailUnique'

@InputType()
export class UserCreateInput {
  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @Validate(UserIsEmailUnique)
  email: string

  @Field()
  @Length(4)
  passwd: string


  @Field()
  @Length(3)
  role: string
}
