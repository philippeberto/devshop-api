import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsUUID, Length, Validate } from 'class-validator'
import { UserIsEmailUnique } from '../validations/userIsEmailUnique'

@InputType()
export class UserUpdateInput {
  @Field()
  @IsUUID()
  id: string

  @Field()
  @Length(3)
  name: string

  @Field()
  @Length(3)
  @IsEmail()
  @Validate(UserIsEmailUnique)
  email: string

  @Field()
  @Length(3)
  role: string

  @Field()
  @Length(4)
  passwd: string
}
