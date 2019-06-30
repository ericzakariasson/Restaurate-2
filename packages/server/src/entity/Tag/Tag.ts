import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Place } from '../Place/Place';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from '../User/User';

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @ManyToOne(() => Place, place => place.tags)
  place: Place;

  author: User;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
