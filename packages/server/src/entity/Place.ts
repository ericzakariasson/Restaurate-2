import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType, Root } from 'type-graphql';
import { Visit } from './Visit';
import { Tag } from './Tag';

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
  googlePlaceId: string;

  @Field()
  @Column()
  name: string;

  @JoinColumn()
  @OneToOne(() => Address, address => address.place)
  address: Address;

  @Field()
  @Column()
  lat: string;

  @Field()
  @Column()
  lng: string;

  @Field()
  @Column()
  url: string;

  @Field(() => PriceLevel)
  @Column({ enum: PriceLevel })
  priceLevel: PriceLevel;

  @Field(() => [Tag], { nullable: true })
  @OneToMany(() => Tag, tag => tag.place, {
    cascade: true,
    eager: true,
    nullable: true
  })
  tags: Tag[];

  @Field(() => [Visit])
  @OneToMany(() => Visit, visit => visit.place)
  visits: Visit[];
}

@ObjectType()
@Entity()
class Address {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Place, place => place.address)
  place: Place;

  @Field()
  formatted(@Root() address: Address): string {
    return `${address.street} ${address.streetNumber}, ${address.city}`;
  }

  @Field()
  @Column()
  streetNumber: number;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  postalCode: number;

  @Field()
  @Column()
  sublocality: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  country: string;
}
