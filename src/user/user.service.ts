import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { AuthToken } from './authtoken.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private authtokenRepository: Repository<AuthToken>
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne(id)
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: [{ email }] })
  }

  async create(input: User): Promise<User> {
    return this.userRepository.save(input)
  }

  async update(input: User): Promise<User> {
    const entity = await this.userRepository.findOne(input.id)
    entity.name = input.name
    entity.email = input.email
    entity.passwd = input.passwd
    entity.role = input.role
    await this.userRepository.save(entity)
    return input
  }

  async delete(id: string): Promise<Boolean> {
    let result = false
    try {
      await this.userRepository.delete(id)
      result = true
    } catch (err) {
      console.log(err)
    }
    return result
  }

  async auth(email: string, passwd: string): Promise<[User, AuthToken]> {
    const user = await this.findByEmail(email)
    if (user && await user.checkPasswd(passwd)) {
      const authToken = new AuthToken()
      authToken.user = user
      const token = await this.authtokenRepository.save(authToken)
      return [user, token]
    } else {
      return null
    }
  }

  async getRefreshToken(id: string): Promise<AuthToken> {
    return await this.authtokenRepository.findOne(id, { relations: ['user'] })
  }
}