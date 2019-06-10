import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';
import {
  Field,
  ID,
  ObjectType,
  InputType,
  registerEnumType
} from 'type-graphql';
import { Visit } from './Visit';

export enum PriceLevel {
  Cheap = 0,
  Medium = 1,
  Expensive = 2,
  Exclusive = 3
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

  @Field()
  @Column()
  name: string;

  @Field(() => PriceLevel)
  @Column({ enum: PriceLevel })
  priceLevel: PriceLevel;

  @Field(() => [Visit])
  @OneToMany(() => Visit, visit => visit.place)
  visits: Visit[];
}

@InputType({ description: 'New place data' })
export class PlaceInput implements Partial<Place> {
  @Field()
  placeId: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => PriceLevel)
  priceLevel: PriceLevel;
}
