import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ID, ObjectType, Root } from 'type-graphql';
import { Visit } from '../Visit/Visit';
import { UserRole } from './UserRoles';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

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

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
