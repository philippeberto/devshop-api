# DevShop-API

## Project Initializing

```
nest new devshop-api
```

## Adding GraphQL Support

https://docs.nestjs.com/graphql/quick-start

```
$ npm i @nestjs/graphql graphql-tools graphql apollo-server-express
```

### Add Module Import at src/app.module.ts

```
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    })
  ],
```
