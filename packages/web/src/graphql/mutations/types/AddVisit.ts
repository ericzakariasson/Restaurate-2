/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddVisitInput } from '../../../types/graphql-global-types';

// ====================================================
// GraphQL mutation operation: AddVisit
// ====================================================

export interface AddVisit_addVisit {
  __typename: 'AddVisitResponse';
  saved: boolean;
}

export interface AddVisit {
  addVisit: AddVisit_addVisit;
}

export interface AddVisitVariables {
  data: AddVisitInput;
}
