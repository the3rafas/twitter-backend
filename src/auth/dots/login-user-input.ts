import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class loginUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
