import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Visit } from './Visit';
import { Tag } from './Tag';
import { Address } from './Address';
import { slugify } from '../utils/slugify';
import { RelationColumn } from '../types/graphql-utils';

export enum PriceLevel {
  Free = 0,
  Inexpensive = 1,
  Moderate = 2,
  Expensive = 3,
  Exclusive = 4
}

registerEnumType(PriceLevel, {
  name: 'PriceLevel',
  description: 'Price level of place'
});

type PriceLevelMap = { [key: number]: PriceLevel };

export const priceLevelMap: PriceLevelMap = {
  0: PriceLevel.Free,
  1: PriceLevel.Inexpensive,
  2: PriceLevel.Moderate,
  3: PriceLevel.Expensive,
  4: PriceLevel.Exclusive
};

export enum PlaceType {
  Restaurant = 'RESTAURANT',
  Cafe = 'CAFE'
}

registerEnumType(PlaceType, {
  name: 'PlaceType',
  description: 'Type of place'
});

type PlaceTypeMap = { [key: string]: PlaceType };

export const placeTypeMap: PlaceTypeMap = {
  restaurant: PlaceType.Restaurant,
  cafe: PlaceType.Cafe
};

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

  @Field(() => [PlaceType])
  @Column({ type: 'enum', enum: PlaceType, array: true })
  types: PlaceType[];

  @Field()
  @Column()
  slug: string;

  @Field(() => Address)
  @OneToOne(() => Address, address => address.place, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  address: Address;
  @RelationColumn()
  addressId: number;

  @Field()
  @Column({ type: 'float' })
  lat: number;

  @Field()
  @Column({ type: 'float' })
  lng: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field(() => PriceLevel, { nullable: true })
  @Column({ enum: PriceLevel, nullable: true })
  priceLevel: PriceLevel;

  @Field(() => [Tag], { nullable: true })
  @OneToMany(() => Tag, tag => tag.place, {
    eager: true,
    cascade: true,
    nullable: true
  })
  tags: Tag[];

  @Field(() => [Visit])
  @OneToMany(() => Visit, visit => visit.place)
  visits: Visit[];

  @BeforeInsert()
  slugify() {
    this.slug = `${slugify(this.name)}-${slugify(
      this.address.street
    )}-${slugify(this.address.city)}`.trim();
  }

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;
}
