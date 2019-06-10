import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Order } from './Order';
import { Rating, RatingInput } from './Rating';
import { Field, ID, ObjectType, InputType } from 'type-graphql';
import { Place, PlaceInput } from './Place';
import { User } from './User';

@ObjectType()
@Entity()
export class Visit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.visits)
  user: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment?: string;

  @Field()
  @Column()
  visitDate: Date;

  @Field(() => [Order])
  @OneToMany(() => Order, order => order.visit, {
    cascade: true,
    eager: true
  })
  orders: Order[];

  @Field(() => Rating)
  @OneToOne(() => Rating, rating => rating.visit, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  rating: Rating;

  @Field(() => Place)
  @ManyToOne(() => Place, place => place.visits)
  place: Place;
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

  @Field(() => PlaceInput)
  place: PlaceInput;
}
