import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>
  ) { }

  async findAll(): Promise<User[]> {
    return this.UserRepository.find()
  }

  async findById(id: string): Promise<User> {
    return this.UserRepository.findOne(id)
  }

  async findByEmail(email: string): Promise<User> {
    return this.UserRepository.findOne({ where: [{ email }] })
  }

  async create(input: User): Promise<User> {
    return this.UserRepository.save(input)
  }

  async update(input: User): Promise<User> {
    await this.UserRepository.update(input.id, {
      name: input.name,
      email: input.email
    })
    return input
  }

  async delete(id: string): Promise<Boolean> {
    let result = false
    try {
      await this.UserRepository.delete(id)
      result = true
    } catch (err) {
      console.log(err)
    }
    return result
  }
}
