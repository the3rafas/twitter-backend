import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Twittes } from 'src/twittes/entities/twitte.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private user: typeof User) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const existingUser = await this.findOne(createUserInput.userName);
      console.log(existingUser);

      if (!existingUser) {
        const { password, userName } = createUserInput;
        const hashPassword = await bcrypt.hash(password, 10);

        const User = await this.user.create({
          u_uuid: uuidv4(),
          userName,
          password: hashPassword,
        });
        return User;
      } else {
        throw new NotFoundException('user already exist');
      }
    } catch (error) {
      throw error;
    }
  }

  async findOne(userName: string) {
    try {
      const User = await this.user.findOne({
        include: [Twittes],
        where: {
          userName,
        },
      });
      return User;
    } catch (error) {
      throw error;
    }
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
