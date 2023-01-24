import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class loginResponde {
  @Field()
  access_Token: string;

  @Field(() => User)
  user: User;
}
