import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Field, ID, InputType, ObjectType, Root } from 'type-graphql';
import { Visit } from './Visit';
import { IsEmail, Min, Max } from 'class-validator';

enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER'
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
    default: UserRoles.USER
  })
  role: UserRoles;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  name(@Root() user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Visit, visit => visit.user)
  visits: Visit[];

  // places - See UserResolver
}

@InputType()
export class UserRegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @Min(6)
  @Max(64)
  @Field()
  password: string;
}
