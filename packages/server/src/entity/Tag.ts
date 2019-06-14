import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from 'typeorm';
import { Place } from './Place';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

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
}
