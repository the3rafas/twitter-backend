import { ExecutionContext } from '@nestjs/common';
import { Session, UseGuards } from '@nestjs/common/decorators';
import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { CreateTwitteInput } from 'src/twittes/dto/create-twitte.input';
import { Twittes } from 'src/twittes/entities/twitte.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { loginResponde } from './dots/login-responde';
import { loginUserInput } from './dots/login-user-input';
import { GetUser } from './get-user.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => loginResponde, { name: 'logIn' })
  @UseGuards(LocalAuthGuard)
  login(@Args('loginInput') loginInput: loginUserInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Query(() => User, { name: 'findOne' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('userName') userName: string) {
    return this.authService.findOne(userName);
  }

  @Mutation(() => Twittes, { name: 'createTwittes' })
  @UseGuards(JwtAuthGuard)
  createTwitte(
    @Args('createTwitteInput') createTwitteInput: CreateTwitteInput,
    @GetUser() context: any,
  ) {
    return this.authService.createTwittes(createTwitteInput, context.user);
  }
}
