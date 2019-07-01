/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  __typename: "User";
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  visitCount: number;
  placeCount: number;
}

export interface Me {
  me: Me_me | null;
}
