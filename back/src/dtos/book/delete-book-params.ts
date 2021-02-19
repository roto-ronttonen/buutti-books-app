import { Validate } from 'class-validator';
import { IsObjectId } from 'src/validators/is-object-id';

export class DeleteBookParams {
  @Validate(IsObjectId)
  id: string;
}
