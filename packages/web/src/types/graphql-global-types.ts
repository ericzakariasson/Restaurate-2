/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Price level of place
 */
export enum PriceLevel {
  Cheap = "Cheap",
  Exclusive = "Exclusive",
  Expensive = "Expensive",
  Medium = "Medium",
}

/**
 * New visit data
 */
export interface AddVisitInput {
  comment?: string | null;
  visitDate: any;
  orders?: string[] | null;
  rate: RateInput;
  priceLevel?: number | null;
  tags?: string[] | null;
  providerPlaceId: string;
}

export interface RateInput {
  food?: number | null;
  service?: number | null;
  environment?: number | null;
  experience?: number | null;
}

export interface UserRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
