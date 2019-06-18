import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Order } from './Order';
import { Rating, RatingInput } from './Rating';
import { Field, ID, ObjectType, InputType } from 'type-graphql';
import { Place } from './Place';
import { User } from './User';
import { RelationColumn } from '../types/graphql-utils';

@ObjectType()
@Entity()
export class Visit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.visits)
  user: User;
  @RelationColumn()
  userId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field()
  @Column()
  visitDate: Date;

  @Column({ default: false })
  deleted: boolean;

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, order => order.visit, {
    cascade: true,
    eager: true,
    nullable: true
  })
  orders: Order[];

  @Field(() => Rating)
  @OneToOne(() => Rating, rating => rating.visit, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  rating: Rating;

  @ManyToOne(() => Place, place => place.visits)
  place: Place;
  @RelationColumn()
  placeId: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}

@InputType({ description: 'New visit data' })
export class AddVisitInput {
  @Field({ nullable: true })
  comment?: string;

  @Field()
  visitDate: Date;

  @Field(() => [String], { nullable: true })
  orders?: string[];

  @Field(() => RatingInput)
  rating: RatingInput;

  @Field(() => Number, { nullable: true })
  priceLevel?: number;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => ID)
  providerPlaceId: string;
}

@ObjectType()
export class AddVisitResponse {
  @Field(() => Boolean)
  saved: boolean;

  @Field(() => Visit, { nullable: true })
  visit?: Visit;

  @Field(() => Place, { nullable: true })
  place?: Place;
}
