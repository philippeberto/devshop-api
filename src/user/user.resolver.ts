import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserMapper } from './user.mapper'
import { UserService } from './user.service'
import { UserPublic } from './dto/user'
import { UserCreateInput } from './dto/user-create.input'
import { UserUpdateInput } from './dto/user-update.input'
import { AuthToken } from './dto/auth'
import { JwtService } from '@nestjs/jwt'
import { AuthUserInput } from './dto/auth-user-input'

@Resolver(of => UserPublic)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  @Query(returns => [UserPublic], { name: 'getAllUsers' })
  async getAllUsers(): Promise<UserPublic[]> {
    return await this.userService.findAll()
  }

  @Query(returns => UserPublic, { name: 'getUserById' })
  async getUserById(
    @Args('id') id: string
  ): Promise<UserPublic> {
    return await this.userService.findById(id)
  }

  @Query(returns => UserPublic, { name: 'getUserByEmail' })
  async getUserByEmail(
    @Args('email') email: string
  ): Promise<UserPublic> {
    return await this.userService.findByEmail(email)
  }

  @Mutation(returns => UserPublic, { name: 'createUser' })
  async createUser(
    @Args('input') input: UserCreateInput
  ): Promise<UserPublic> {
    return this.userService.create(UserMapper.toEntity(input))
  }

  @Mutation(returns => UserPublic, { name: 'updateUser' })
  async updateUser(
    @Args('input') input: UserUpdateInput
  ): Promise<UserPublic> {
    return this.userService.update(UserMapper.toUpdateEntity(input))
  }

  @Mutation(returns => Boolean, { name: 'deleteUser' })
  async deleteUser(
    @Args('id') id: string
  ): Promise<Boolean> {
    return this.userService.delete(id)
  }

  @Mutation(returns => AuthToken, { name: 'auth' })
  async auth(
    @Args('input') input: AuthUserInput
  ): Promise<AuthToken> {
    const [user, refreshToken] = await this.userService.auth(input.email, input.passwd)

    if (user) {
      const authToken = new AuthToken()
      authToken.refreshToken = this.jwtService.sign({
        scope: 'refreshToken',
        id: refreshToken.id,
      }, {
        expiresIn: '8 hours'
      })
      authToken.accessToken = this.jwtService.sign({
        scope: 'accessToken',
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }, {
        expiresIn: '30 minute'
      })
      return authToken
    }
    else {
      return null
    }
  }

  @Mutation(returns => String, { name: 'accessToken' })
  async accessToken(
    @Args('refreshToken') refreshToken: string
  ): Promise<string> {
    const decoded = this.jwtService.verify(refreshToken)
    if (decoded && decoded.scope === 'refreshToken') {
      const authToken = await this.userService.getRefreshToken(decoded.id)
      const accessToken = this.jwtService.sign({
        scope: 'accessToken',
        id: authToken.user.id,
        name: authToken.user.name,
        email: authToken.user.email,
        role: authToken.user.role
      }, {
        expiresIn: '60 minute'
      })
      return accessToken
    }
    else {
      return null
    }
  }
}
