import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length, IsString } from 'class-validator';

@InputType()
export class CreateTwitteInput {
  @IsString()
  @IsNotEmpty()
  @Length(0, 700)
  @Field()
  content: string;
}
