/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PriceLevel } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: MePlaces
// ====================================================

export interface MePlaces_me_places_address {
  __typename: "Address";
  streetNumber: string;
  street: string;
  formatted: string;
  sublocality: string;
  city: string;
  country: string;
}

export interface MePlaces_me_places_tags {
  __typename: "Tag";
  id: string;
  title: string;
}

export interface MePlaces_me_places {
  __typename: "Place";
  id: string;
  googlePlaceId: string;
  name: string;
  slug: string;
  address: MePlaces_me_places_address;
  url: string | null;
  lat: number;
  lng: number;
  priceLevel: PriceLevel | null;
  tags: MePlaces_me_places_tags[] | null;
  visitCount: number;
}

export interface MePlaces_me {
  __typename: "User";
  placeCount: number;
  places: MePlaces_me_places[];
}

export interface MePlaces {
  me: MePlaces_me | null;
}
