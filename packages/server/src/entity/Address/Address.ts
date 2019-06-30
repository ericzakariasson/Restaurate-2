import { ObjectType, Field, ID, Root } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
import { Place } from '../Place/Place';
import { createFromPlaceData } from './addressHelper';

@ObjectType()
@Entity()
export class Address extends BaseEntity {
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
  streetNumber: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  postalCode: string;

  @Field()
  @Column()
  sublocality: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  country: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: string;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: string;

  static createFromPlaceData = createFromPlaceData;
}
