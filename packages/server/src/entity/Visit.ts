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
import { Rating, RatingInput } from './Rating';
import { Field, ID, ObjectType, InputType } from 'type-graphql';

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
  @OneToOne(() => Rating, rating => rating.visit, {
    cascade: true
  })
  @JoinColumn()
  rating: Rating;
}

@InputType({ description: 'New visit data' })
export class AddVisitInput {
  @Field({ nullable: true })
  comment: string;

  @Field()
  visitDate: Date;

  @Field(() => [String], { nullable: true })
  orders: string[];

  @Field(() => RatingInput)
  rating: RatingInput;
}
