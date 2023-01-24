import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
@ObjectType()
export class Twittes extends Model {
  @AutoIncrement
  @Column
  id: number;

  @PrimaryKey
  @Column
  @Field()
  uuid: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  @Field()
  content: string;

  @ForeignKey(() => User)
  @Column
  @Field()
  user_id: string;

  @BelongsTo(() => User)
  user: User;
}
