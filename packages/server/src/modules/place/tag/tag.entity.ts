import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Place } from '../place.entity';
import { User } from '../../user/user.entity';
import { RelationColumn } from '../../utils';

@ObjectType()
@Entity()
export class Tag {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToMany(
    () => Place,
    place => place.tags
  )
  place: Place[];

  user: User;
  @RelationColumn()
  userId: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: string;
}
