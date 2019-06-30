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
import { Order } from '../Order/Order';
import { Rate } from '../Rate/Rate';
import { Field, ID, ObjectType } from 'type-graphql';
import { Place } from '../Place/Place';
import { User } from '../User/User';
import { RelationColumn } from '../../types/graphql-utils';

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
