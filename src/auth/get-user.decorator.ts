import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

export const GetUser = createParamDecorator(
  async (data, context: ExecutionContext): Promise<User> => {
    const ctx = GqlExecutionContext.create(context);
    const req = await ctx.getContext().req;

    return req;
  },
);
