import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Visit } from './Visit';
import { User } from './User';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @ManyToOne(() => Visit, visit => visit.orders)
  visit: Visit;

  author: User;
}
