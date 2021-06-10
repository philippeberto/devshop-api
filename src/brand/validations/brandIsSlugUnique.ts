import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { BrandService } from '../brand.service'

@ValidatorConstraint({ name: 'BrandIsSlugUnique', async: true })
export class BrandIsSlugUnique implements ValidatorConstraintInterface {
  constructor(private readonly brandService: BrandService) {

  }
  async validate(text: string, validationArguments: ValidationArguments): Promise<boolean> {
    const brand = await this.brandService.findBySlug(text)
    //check if operatoin is an update
    if (validationArguments.object['id'] && brand) {
      if (validationArguments.object['id'] === brand.id) {
        return true
      }
    }
    return brand ? false : true
  }
  defaultMessage(args: ValidationArguments): string {
    return 'Slug must be unique.'
  }
}