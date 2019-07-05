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
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../user/user.entity';
import { Order } from './order.entity';
import { RelationColumn } from '../utils';
import { Rate } from './rate.entity';
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

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, order => order.visit, {
    cascade: true,
    eager: true,
    nullable: true
  })
  orders: Order[];

  @Field(() => Rate)
  @OneToOne(() => Rate, rate => rate.visit, {
    cascade: true,
    eager: true
  })
  @JoinColumn()
  rate: Rate;
  @RelationColumn()
  rateId: number;

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
