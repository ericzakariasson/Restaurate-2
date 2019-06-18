/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * New visit data
 */
export interface AddVisitInput {
  comment?: string | null;
  visitDate: any;
  orders?: string[] | null;
  rating: RatingInput;
  priceLevel?: number | null;
  tags?: string[] | null;
  providerPlaceId: string;
}

export interface RatingInput {
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
