//O Module irá unir demais classes
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { User } from './user.entity'
import { UserIsEmailUnique } from './validations/userIsEmailUnique'
import { JwtModule } from '@nestjs/jwt'
import { ProcessCredentials } from 'aws-sdk'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthToken } from './authtoken.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthToken]),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      })
    })
  ],
  providers: [UserService, UserResolver, UserIsEmailUnique]
})
export class UserModule { }
