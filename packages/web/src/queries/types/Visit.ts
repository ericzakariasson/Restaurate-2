/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Visit
// ====================================================

export interface Visit_visit_orders {
  __typename: "Order";
  id: string;
  title: string;
}

export interface Visit_visit_rate {
  __typename: "Rate";
  id: string;
  score: number;
  food: number | null;
  service: number | null;
  environment: number | null;
  experience: number | null;
}

export interface Visit_visit_place_address {
  __typename: "Address";
  id: string;
  formatted: string;
}

export interface Visit_visit_place {
  __typename: "Place";
  id: string;
  name: string;
  address: Visit_visit_place_address;
  slug: string;
}

export interface Visit_visit {
  __typename: "Visit";
  id: string;
  comment: string | null;
  visitDate: any;
  orders: Visit_visit_orders[] | null;
  rate: Visit_visit_rate;
  place: Visit_visit_place;
}

export interface Visit {
  visit: Visit_visit | null;
}

export interface VisitVariables {
  id: string;
}
