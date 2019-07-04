import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Visit } from './visit.entity';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class Rate extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Visit, visit => visit.rate)
  visit: Visit;

  @Field()
  @Column({ type: 'float' })
  score: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  food: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  service: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  environment: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  experience: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
