import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from '../../user/user.entity';
import { RelationColumn } from '../../utils';

@ObjectType()
@Entity()
export class WantToVisit {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  providerId: string;

  user: User;
  @RelationColumn()
  userId: number;

  @Column({ default: false })
  visited: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: string;
}
