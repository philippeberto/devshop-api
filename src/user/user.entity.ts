import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { AuthToken } from './authtoken.entity'

//O TypeORM possui alguns event listeners que ajudam a realizar operações como
//criptografar a senha, definir o createdAt e updatedAt: AfterLoad, BeforeInsert, 
//AfterInsert, AfterUpdate, BeforeUpdate, AfterRemove, BeforeRemove

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 250, nullable: false })
  name: string

  @Column({ length: 450, nullable: false })
  email: string

  @Column({ length: 450, nullable: false })
  passwd: string

  @Column({ length: 450, nullable: false })
  role: string //root, user, financial

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(() => AuthToken, authToken => authToken.user)
  authTokens: AuthToken[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswd(): Promise<void> {
    if (this.passwd)
      this.passwd = await bcrypt.hash(this.passwd, 10)
  }

  @BeforeInsert()
  setCreatedAt(): void {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  setUpdatedAt(): void {
    this.updatedAt = new Date()
  }

  async checkPasswd(passwd: string): Promise<boolean> {
    return bcrypt.compare(passwd, this.passwd)
  }
}
