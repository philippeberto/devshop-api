//O Module irá unir demais classes
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserIsEmailUnique } from './validations/userIsEmailUnique'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, UserIsEmailUnique]
})
export class UserModule { }
