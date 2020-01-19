import { Field, ID, ObjectType } from 'type-graphql';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Column
} from 'typeorm';
import { Visit } from '../visit.entity';
import { User } from '../../user/user.entity';
import { RelationColumn } from '../../utils';
import { Order } from '../order/order.entity';

@ObjectType()
@Entity()
export class VisitImage {
  constructor(initializer?: Partial<VisitImage>) {
    Object.assign(this, initializer);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  placeProviderId: string;

  @Field()
  @Column()
  publicId: string;

  @Field()
  @Column()
  url: string;

  @ManyToOne(
    () => Visit,
    visit => visit.images
  )
  visit: Visit;
  @RelationColumn()
  visitId: number;

  @ManyToOne(() => User)
  user: User;
  @RelationColumn()
  userId: number;

  @Field(() => [Order], { nullable: true })
  @ManyToMany(() => Order, { eager: true })
  @JoinTable()
  orders: Order[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
