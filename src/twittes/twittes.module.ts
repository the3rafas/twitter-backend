import { Module } from '@nestjs/common';
import { TwittesService } from './twittes.service';
import { TwittesResolver } from './twittes.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Twittes } from './entities/twitte.entity';

@Module({
  imports: [SequelizeModule.forFeature([Twittes])],
  providers: [TwittesResolver, TwittesService],
  exports: [TwittesService],
})
export class TwittesModule {}
