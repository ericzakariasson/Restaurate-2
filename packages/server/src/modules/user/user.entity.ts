import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ID, ObjectType, Root, registerEnumType } from 'type-graphql';
import { Visit } from '../visit/visit.entity';
import { Place } from '../place/place.entity';

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role'
});

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [UserRole])
  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.User]
  })
  roles: UserRole[];

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

  @Column({ default: false })
  confirmed: boolean;

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
