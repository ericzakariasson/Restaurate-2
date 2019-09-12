import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Visit } from '../visit/visit.entity';
import { Tag } from './tag/tag.entity';
import { User } from '../user/user.entity';
import { RelationColumn } from '../utils';
import { PlaceType, PriceLevel } from './place.types';

@ObjectType()
@Entity()
export class Place {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column()
  providerPlaceId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.places)
  user: User;
  @RelationColumn()
  userId: number;

  // @Field()
  // @Column()
  // slug: string;

  @Field(() => [PlaceType], { nullable: true })
  @Column({ type: 'enum', enum: PlaceType, array: true, nullable: true })
  types: PlaceType[];

  @Field(() => PriceLevel)
  @Column({ enum: PriceLevel, default: PriceLevel.NotSet })
  priceLevel: PriceLevel;

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment: string;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, tag => tag.place, {
    eager: true
  })
  @JoinTable()
  tags: Tag[];

  @Field(() => [Visit])
  @OneToMany(() => Visit, visit => visit.place)
  visits: Visit[];

  @Field(() => Date, { nullable: true })
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn()
  updatedAt: string;
}

registerEnumType(PlaceType, {
  name: 'PlaceType',
  description: 'Type of place'
});

registerEnumType(PriceLevel, {
  name: 'PriceLevel',
  description: 'Price level of place'
});
