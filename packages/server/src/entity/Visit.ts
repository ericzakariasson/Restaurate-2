import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Order } from './Order';
import { Rating } from './Rating';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Visit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field()
  @Column()
  visitDate: Date;

  @Field(() => [Order])
  @OneToMany(() => Order, order => order.visit, {
    cascade: true
  })
  orders: Order[];

  @Field(() => Rating)
  @OneToOne(() => Rating, rating => rating.visit)
  @JoinColumn()
  rating: Rating;
}
