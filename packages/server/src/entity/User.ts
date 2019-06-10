import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Field, ID, InputType, ObjectType, Root } from 'type-graphql';
import { Visit } from './Visit';

enum UserRoles {
  ADMIN = 'ADMIN',
  DEFAULT = 'DEFAULT'
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    enum: UserRoles,
    default: UserRoles.DEFAULT
  })
  role: UserRoles;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Visit], { nullable: true })
  @OneToMany(() => Visit, visit => visit.user)
  visits?: Visit[];
}

@InputType()
export class UserRegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
