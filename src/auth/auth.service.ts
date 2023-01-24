import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TwittesService } from 'src/twittes/twittes.service';
import { CreateTwitteInput } from 'src/twittes/dto/create-twitte.input';
import {
  BadRequestException,
  NotAcceptableException,
} from '@nestjs/common/exceptions';
import { Twittes } from 'src/twittes/entities/twitte.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private twitesService: TwittesService,

    private jwtService: JwtService,
  ) {}

  async createTwittes(
    createTwitteInput: CreateTwitteInput,
    user: User,
  ): Promise<Twittes> {
    try {
      const userTwitte = this.usersService.findOne(user.userName);
      if (userTwitte) {
        const twitte = this.twitesService.create(createTwitteInput, user);
        return twitte;
      } else {
        throw new BadRequestException("user isn't exist");
      }
    } catch (error) {
      throw error;
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotAcceptableException('userName are wrong');
    }
    const valid = await bcrypt.compare(pass, user.password);
    if (valid) {
      const { password, ...result } = user;

      return result;
    } else {
      throw new NotAcceptableException('password are wrong');
    }
  }

  async login(user: User) {
    try {
      return {
        access_Token: this.jwtService.sign({
          username: user.userName,
          sub: user.u_uuid,
        }),
        user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(userName: string) {
    try {
      const User = await this.usersService.findOne(userName);
      return User;
    } catch (error) {
      console.log(error);
    }
  }
}
