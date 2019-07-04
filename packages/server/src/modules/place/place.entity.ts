import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Visit } from '../visit/visit.entity';
import { Tag } from './tag.entity';
import { User } from '../user/user.entity';

export enum PlaceType {
  Restaurant = 'RESTAURANT',
  Cafe = 'CAFE'
}

registerEnumType(PlaceType, {
  name: 'PlaceType',
  description: 'Type of place'
});

export enum PriceLevel {
  Inexpensive = 1,
  Moderate = 2,
  Expensive = 3,
  Exclusive = 4
}

registerEnumType(PriceLevel, {
  name: 'PriceLevel',
  description: 'Price level of place'
});

@ObjectType()
@Entity()
export class Place extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.places)
  user: User;

  @Field()
  @Column()
  slug: string;

  @Field(() => [PlaceType])
  @Column({ type: 'enum', enum: PlaceType, array: true })
  types: PlaceType[];

  @Field(() => PriceLevel, { nullable: true })
  @Column({ enum: PriceLevel, nullable: true })
  priceLevel: PriceLevel;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, tag => tag.place, {
    eager: true,
    nullable: true
  })
  @JoinTable()
  tags: Tag[];

  @Field(() => [Visit])
  @OneToMany(() => Visit, visit => visit.place)
  visits: Visit[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
