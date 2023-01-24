import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  Default,
  HasMany,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';
import { Twittes } from '../../twittes/entities/twitte.entity';

@Table
@ObjectType()
export class User extends Model {
  @AutoIncrement
  @Column
  id: number;

  @PrimaryKey
  @Column
  @Field()
  u_uuid: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.TEXT,
  })
  @Field()
  userName: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  @Field()
  password: string;

  @Column({
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  @Field()
  admin: boolean;

  @HasMany(() => Twittes)
  @Field((type) => [Twittes])
  twittes: Twittes[];
}
