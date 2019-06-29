import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Visit } from './Visit';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
@Entity()
export class Rate extends BaseEntity {
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

@InputType('RateInput')
export class RateInput implements Partial<Rate> {
  @Field({ nullable: true })
  food: number;

  @Field({ nullable: true })
  service: number;

  @Field({ nullable: true })
  environment: number;

  @Field({ nullable: true })
  experience: number;
}
