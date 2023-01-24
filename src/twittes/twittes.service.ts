import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTwitteInput } from './dto/create-twitte.input';
import { UpdateTwitteInput } from './dto/update-twitte.input';
import { Twittes } from './entities/twitte.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/entities/user.entity';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';

@Injectable()
export class TwittesService {
  constructor(@InjectModel(Twittes) private twiter: typeof Twittes) {}

  async create(createTwitteInput: CreateTwitteInput, user: User) {
    const twitte = await this.twiter.create({
      ...createTwitteInput,
      uuid: uuidv4(),
      user_id: user.u_uuid,
    });

    await twitte.save();
    return twitte;
  }

  async findAll() {
    try {
      const twittes = await this.twiter.findAll();
      return twittes;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const twitte = await this.twiter.findOne({
        where: {
          uuid: id,
        },
      });
      if (twitte) {
        return twitte;
      } else {
        throw new NotFoundException('no twittes for this user');
      }
    } catch (error) {
      throw error;
    }
  }

  async findAllByUserID(id: string) {
    try {
      const twittes = await this.twiter.findAll({
        where: {
          user_id: id,
        },
      });
      if (twittes) {
        return twittes;
      } else {
        throw new NotFoundException('no twittes for this user');
      }
    } catch (error) {
      throw error;
    }
  }

  // update(id: number, updateTwitteInput: UpdateTwitteInput) {
  //   return `This action updates a #${id} twitte`;
  // }

  async remove(id: string, user: User) {
    try {
      const twitte = await this.twiter.findOne({
        where: {
          uuid: id,
        },
      });
      if (twitte.user_id === user.u_uuid) {
        await twitte.destroy();
        return twitte;
      } else {
        throw new UnauthorizedException(
          'this user has no access to this actin',
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
