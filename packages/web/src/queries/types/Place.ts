/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PriceLevel } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: Place
// ====================================================

export interface Place_place_address {
  __typename: "Address";
  id: string;
  street: string;
  streetNumber: string;
  sublocality: string;
  city: string;
  country: string;
}

export interface Place_place_tags {
  __typename: "Tag";
  id: string;
  title: string;
}

export interface Place_place_visits_rate {
  __typename: "Rate";
  id: string;
  score: number;
}

export interface Place_place_visits_orders {
  __typename: "Order";
  id: string;
  title: string;
}

export interface Place_place_visits {
  __typename: "Visit";
  id: string;
  visitDate: any;
  rate: Place_place_visits_rate;
  orders: Place_place_visits_orders[] | null;
}

export interface Place_place {
  __typename: "Place";
  id: string;
  googlePlaceId: string;
  name: string;
  slug: string;
  address: Place_place_address;
  lat: number;
  lng: number;
  url: string | null;
  priceLevel: PriceLevel | null;
  visitCount: number;
  averageScore: number;
  tags: Place_place_tags[] | null;
  visits: Place_place_visits[];
}

export interface Place {
  place: Place_place | null;
}

export interface PlaceVariables {
  slug?: string | null;
}
