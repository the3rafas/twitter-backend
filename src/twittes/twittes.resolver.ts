import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TwittesService } from './twittes.service';
import { Twittes } from './entities/twitte.entity';
import { CreateTwitteInput } from './dto/create-twitte.input';
import { UpdateTwitteInput } from './dto/update-twitte.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';

@Resolver(() => Twittes)
export class TwittesResolver {
  constructor(private readonly twittesService: TwittesService) {}

  @Query(() => [Twittes], { name: 'twittes' })
  findAll() {
    return this.twittesService.findAll();
  }

  @Query(() => [Twittes], { name: 'user_twittes' })
  @UseGuards(JwtAuthGuard)
  findAllByUserId(@Args('id') id: string) {
    return this.twittesService.findAllByUserID(id);
  }

  @Query(() => Twittes, { name: 'twitte' })
  @UseGuards(JwtAuthGuard)
  findOneById(@Args('id') id: string) {
    return this.twittesService.findOne(id);
  }

  @Mutation(() => Twittes, { name: 'deleteTwittes' })
  @UseGuards(JwtAuthGuard)
  removeTwitte(@Args('id') id: string, @GetUser() context: any) {
    return this.twittesService.remove(id, context.user);
  }
}
