import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { CategoryService } from '../category.service'

@ValidatorConstraint({ name: 'categoryIsSlugUnique', async: true })
export class CategoryIsSlugUnique implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {

  }
  async validate(text: string, validationArguments): Promise<boolean> {
    const category = await this.categoryService.findBySlug(text)
    return category ? false : true
  }
  defaultMessage(args: ValidationArguments): string {
    return 'Slug must be unique.'
  }
}