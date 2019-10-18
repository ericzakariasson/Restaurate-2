import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Visit } from '../visit.entity';
import { User } from '../../user/user.entity';
import { RelationColumn } from '../../utils';
import { VisitImage } from '../image/visit.image.entity';

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @ManyToOne(() => Visit, visit => visit.orders)
  visit: Visit;
  @RelationColumn()
  visitId: number;

  @Field(() => [VisitImage])
  @ManyToMany(() => VisitImage, image => image.orders)
  images: VisitImage[];

  user: User;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
