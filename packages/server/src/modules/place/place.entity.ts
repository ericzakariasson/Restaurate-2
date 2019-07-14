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
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  foursquareId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.places)
  user: User;
  @RelationColumn()
  userId: number;

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

registerEnumType(PlaceType, {
  name: 'PlaceType',
  description: 'Type of place'
});

registerEnumType(PriceLevel, {
  name: 'PriceLevel',
  description: 'Price level of place'
});
