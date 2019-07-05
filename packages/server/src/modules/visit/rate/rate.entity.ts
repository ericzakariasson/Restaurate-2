import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Visit } from '../visit.entity';
import { RelationColumn } from '../../utils';

@ObjectType()
@Entity()
export class Rate {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Visit, visit => visit.ratings)
  visit: Visit;
  @RelationColumn()
  visitId: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'float' })
  score: number;

  @Field()
  @Column({ default: false })
  calculatedScore?: boolean;

  @ManyToOne(() => Rate, rate => rate.parent, {
    nullable: true
  })
  parent: Rate;
  @RelationColumn()
  parentId: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
