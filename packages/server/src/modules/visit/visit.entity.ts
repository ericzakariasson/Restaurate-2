import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../user/user.entity';
import { Order } from './order/order.entity';
import { RelationColumn } from '../utils';
import { Rate } from './rate/rate.entity';
import { Place } from '../place/place.entity';

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

  @Field(() => [Order])
  @OneToMany(() => Order, order => order.visit, {
    cascade: true,
    eager: true,
    nullable: true
  })
  orders: Order[];

  @Field(() => [Rate])
  @OneToMany(() => Rate, rate => rate.visit, {
    cascade: true,
    eager: true
  })
  ratings: Rate[];

  @Field()
  @Column({ type: 'float' })
  score: number;

  @ManyToOne(() => Place, place => place.visits)
  place: Place;
  @RelationColumn()
  placeId: number;

  @Field()
  @Column({ default: false })
  private: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
