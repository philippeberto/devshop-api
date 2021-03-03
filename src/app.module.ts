import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { CategoryModule } from './category/category.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './category/category.entity'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { async } from 'rxjs'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, //não recomendável quando estiver em produção
        //entities: [Category],
        logging: true
      })
    }),
    /*TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://fullstackmaster:1234@localhost:5432/devshop',
      autoLoadEntities: true,
      synchronize: true, //não recomendável quando estiver em produção
      //entities: [Category],
      logging: true
    }),*/
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    }),
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
