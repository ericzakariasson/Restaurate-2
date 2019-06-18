import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Visit } from './Visit';
import { Tag } from './Tag';
import { Address } from './Address';
import { slugify } from '../utils/slugify';

export enum PriceLevel {
  Cheap = 0,
  Medium = 1,
  Expensive = 2,
  Exclusive = 3
}

type PriceLevelMap = { [key: number]: PriceLevel };

export const priceLevelMap: PriceLevelMap = {
  0: PriceLevel.Cheap,
  1: PriceLevel.Medium,
  2: PriceLevel.Expensive,
  3: PriceLevel.Exclusive
};

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
}
