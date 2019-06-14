import { ObjectType, Field, ID, Root } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { Place } from './Place';

@ObjectType()
@Entity()
export class Address {
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
