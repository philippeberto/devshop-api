import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { UserService } from '../user.service'

@ValidatorConstraint({ name: 'UserIsEmailUnique', async: true })
export class UserIsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {

  }
  async validate(text: string, validationArguments: ValidationArguments): Promise<boolean> {
    const user = await this.userService.findByEmail(text)
    //check if operatoin is an update
    if (validationArguments.object['id'] && user) {
      if (validationArguments.object['id'] === user.id) {
        return true
      }
    }
    return user ? false : true
  }
  defaultMessage(args: ValidationArguments): string {
    return 'This email is associated to another user.'
  }
}