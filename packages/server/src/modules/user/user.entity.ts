import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ID, ObjectType, Root, registerEnumType } from 'type-graphql';
import { Visit } from '../visit/visit.entity';
import { Place } from '../place/place.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role'
});

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

  @OneToMany(() => Place, place => place.user)
  places: Visit[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
