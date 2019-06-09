import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ID } from 'type-graphql';

@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  password: string;
}
