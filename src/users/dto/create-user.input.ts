import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  @Field()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
