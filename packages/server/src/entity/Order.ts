import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from 'typeorm';
import { Visit } from './Visit';
import { ObjectType, Field, ID } from 'type-graphql';

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
}
