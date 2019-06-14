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
  @OneToOne(() => Address, address => address.place, { eager: true })
  @JoinColumn()
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

  @BeforeInsert()
  slugify() {
    this.slug = `
      ${slugify(this.name)}-
      ${slugify(this.address.street)}-
      ${slugify(this.address.city)}`;
  }
}
