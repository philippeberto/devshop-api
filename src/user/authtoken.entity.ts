import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

//O TypeORM possui alguns event listeners que ajudam a realizar operações como
//criptografar a senha, definir o createdAt e updatedAt: AfterLoad, BeforeInsert, 
//AfterInsert, AfterUpdate, BeforeUpdate, AfterRemove, BeforeRemove

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamp' })
  createdAt: Date

  @BeforeInsert()
  setCreatedAt(): void {
    this.createdAt = new Date()
  }

  @ManyToOne(
    type => User,
    user => user.authTokens
  )
  user: User
}
