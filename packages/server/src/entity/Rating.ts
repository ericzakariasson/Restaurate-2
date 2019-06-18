import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity
} from 'typeorm';
import { Visit } from './Visit';
import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Visit, visit => visit.rating)
  visit: Visit;

  @Field()
  @Column()
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

  @Column()
  rawData: string;
}

@InputType('RatingInput')
export class RatingInput implements Partial<Rating> {
  @Field({ nullable: true })
  food: number;

  @Field({ nullable: true })
  service: number;

  @Field({ nullable: true })
  environment: number;

  @Field({ nullable: true })
  experience: number;
}
