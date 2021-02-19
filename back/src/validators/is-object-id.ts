import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types as MongooseTypes } from 'mongoose';

@ValidatorConstraint({ name: 'isObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(value: any, __?: ValidationArguments): boolean | Promise<boolean> {
    return MongooseTypes.ObjectId.isValid(value);
  }
  defaultMessage?(_?: ValidationArguments): string {
    return '$value is not an object id!';
  }
}
