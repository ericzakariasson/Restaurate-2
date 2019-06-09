import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity
} from 'typeorm';
import { Visit } from './Visit';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Visit, visit => visit.rating)
  visit: Visit;

  @Field()
  @Column()
  food: number;

  @Field()
  @Column()
  service: number;

  @Field()
  @Column()
  environment: number;

  @Field()
  @Column()
  experience: number;

  @Field(() => String)
  @Column({ type: 'jsonb' })
  data: JSON;
}
