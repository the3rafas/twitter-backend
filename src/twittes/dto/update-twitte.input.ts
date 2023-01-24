import { CreateTwitteInput } from './create-twitte.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTwitteInput extends PartialType(CreateTwitteInput) {
  @Field(() => Int)
  id: number;
}
