//O Module irá unir demais classes
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandResolver } from './brand.resolver'
import { BrandService } from './brand.service'
import { Brand } from './brand.entity'
import { BrandIsSlugUnique } from './validations/brandIsSlugUnique'

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  providers: [BrandService, BrandResolver, BrandIsSlugUnique]
})
export class BrandModule { }
