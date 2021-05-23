import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { ProductService } from 'src/product/product.service'

@ValidatorConstraint({ name: 'productIsSlugUnique', async: true })
export class ProductIsSlugUnique implements ValidatorConstraintInterface {
  constructor(private readonly productService: ProductService) {

  }
  async validate(text: string, validationArguments: ValidationArguments): Promise<boolean> {
    const product = await this.productService.findBySlug(text)
    //check if operatoin is an update
    if (validationArguments.object['id'] && product) {
      if (validationArguments.object['id'] === product.id) {
        return true
      }
    }
    return product ? false : true
  }
  defaultMessage(args: ValidationArguments): string {
    return 'Slug must be unique.'
  }
}