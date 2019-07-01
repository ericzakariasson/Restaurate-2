/* eslint-disable */
import gql from 'graphql-tag';
import * as ReactApolloHooks from 'react-apollo-hooks';
import * as ReactApollo from 'react-apollo';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['ID'];
  formatted: Scalars['String'];
  streetNumber: Scalars['String'];
  street: Scalars['String'];
  postalCode: Scalars['String'];
  sublocality: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

/** New visit data */
export type AddVisitInput = {
  comment?: Maybe<Scalars['String']>;
  visitDate: Scalars['DateTime'];
  orders?: Maybe<Array<Scalars['String']>>;
  rate: RateInput;
  priceLevel?: Maybe<Scalars['Float']>;
  tags?: Maybe<Array<Scalars['String']>>;
  types: Array<Scalars['String']>;
  providerPlaceId: Scalars['ID'];
};

export type AddVisitResponse = {
  __typename?: 'AddVisitResponse';
  saved: Scalars['Boolean'];
  visit?: Maybe<Visit>;
  place?: Maybe<Place>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  addVisit: AddVisitResponse;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationRegisterArgs = {
  data: UserRegisterInput;
};

export type MutationAddVisitArgs = {
  data: AddVisitInput;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  title: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Place = {
  __typename?: 'Place';
  id: Scalars['ID'];
  googlePlaceId: Scalars['String'];
  name: Scalars['String'];
  types: Array<PlaceType>;
  slug: Scalars['String'];
  address: Address;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  url?: Maybe<Scalars['String']>;
  priceLevel?: Maybe<PriceLevel>;
  tags?: Maybe<Array<Tag>>;
  visits: Array<Visit>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  visitCount: Scalars['Float'];
  averageScore: Scalars['Float'];
};

export type PlaceVisitsArgs = {
  limit?: Maybe<Scalars['Float']>;
};

/** Type of place */
export enum PlaceType {
  Restaurant = 'Restaurant',
  Cafe = 'Cafe'
}

/** Price level of place */
export enum PriceLevel {
  Free = 'Free',
  Inexpensive = 'Inexpensive',
  Moderate = 'Moderate',
  Expensive = 'Expensive',
  Exclusive = 'Exclusive'
}

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  visit?: Maybe<Visit>;
  place?: Maybe<Place>;
};

export type QueryVisitArgs = {
  id: Scalars['String'];
};

export type QueryPlaceArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type Rate = {
  __typename?: 'Rate';
  id: Scalars['ID'];
  score: Scalars['Float'];
  food?: Maybe<Scalars['Float']>;
  service?: Maybe<Scalars['Float']>;
  environment?: Maybe<Scalars['Float']>;
  experience?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type RateInput = {
  food?: Maybe<Scalars['Float']>;
  service?: Maybe<Scalars['Float']>;
  environment?: Maybe<Scalars['Float']>;
  experience?: Maybe<Scalars['Float']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  title: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  role: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  places: Array<Place>;
  visits: Array<Visit>;
  placeCount: Scalars['Float'];
  visitCount: Scalars['Float'];
};

export type UserRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Visit = {
  __typename?: 'Visit';
  id: Scalars['ID'];
  comment?: Maybe<Scalars['String']>;
  visitDate: Scalars['DateTime'];
  orders?: Maybe<Array<Order>>;
  rate: Rate;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  place: Place;
  user: User;
};
export type PlaceFragment = { __typename?: 'Place' } & Pick<
  Place,
  | 'id'
  | 'googlePlaceId'
  | 'name'
  | 'slug'
  | 'lat'
  | 'lng'
  | 'priceLevel'
  | 'url'
  | 'createdAt'
  | 'updatedAt'
  | 'averageScore'
  | 'visitCount'
> & {
    address: { __typename?: 'Address' } & PlaceAddressFragment;
    tags: Maybe<Array<{ __typename?: 'Tag' } & PlaceTagFragment>>;
  };

export type PlaceAddressFragment = { __typename?: 'Address' } & Pick<
  Address,
  | 'id'
  | 'formatted'
  | 'street'
  | 'streetNumber'
  | 'sublocality'
  | 'city'
  | 'country'
>;

export type PlaceTagFragment = { __typename?: 'Tag' } & Pick<
  Tag,
  'id' | 'title' | 'createdAt'
>;

export type UserFragment = { __typename?: 'User' } & Pick<
  User,
  | 'id'
  | 'name'
  | 'firstName'
  | 'lastName'
  | 'role'
  | 'email'
  | 'createdAt'
  | 'updatedAt'
  | 'placeCount'
  | 'visitCount'
>;

export type VisitFragment = { __typename?: 'Visit' } & Pick<
  Visit,
  'id' | 'comment' | 'visitDate' | 'createdAt' | 'updatedAt'
> & {
    orders: Maybe<Array<{ __typename?: 'Order' } & VisitOrderFragment>>;
    rate: { __typename?: 'Rate' } & VisitRateFragment;
    user: { __typename?: 'User' } & UserFragment;
    place: { __typename?: 'Place' } & PlaceFragment;
  };

export type VisitOrderFragment = { __typename?: 'Order' } & Pick<
  Order,
  'id' | 'createdAt' | 'createdAt'
>;

export type VisitRateFragment = { __typename?: 'Rate' } & Pick<
  Rate,
  | 'id'
  | 'score'
  | 'food'
  | 'service'
  | 'environment'
  | 'experience'
  | 'createdAt'
  | 'updatedAt'
>;

export type MeQueryVariables = {};

export type MeQuery = { __typename?: 'Query' } & {
  me: Maybe<{ __typename?: 'User' } & UserFragment>;
};

export type MePlacesQueryVariables = {};

export type MePlacesQuery = { __typename?: 'Query' } & {
  me: Maybe<
    { __typename?: 'User' } & Pick<User, 'placeCount'> & {
        places: Array<
          { __typename?: 'Place' } & ({ __typename?: 'Place' } & {
            visits: Array<{ __typename?: 'Visit' } & VisitFragment>;
          })
        >;
      }
  >;
};

export type MeVisitsQueryVariables = {};

export type MeVisitsQuery = { __typename?: 'Query' } & {
  me: Maybe<
    { __typename?: 'User' } & Pick<User, 'visitCount'> & {
        visits: Array<{ __typename?: 'Visit' } & VisitFragment>;
      }
  >;
};

export type PlaceQueryVariables = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type PlaceQuery = { __typename?: 'Query' } & {
  place: Maybe<
    { __typename?: 'Place' } & ({ __typename?: 'Place' } & {
      visits: Array<{ __typename?: 'Visit' } & VisitFragment>;
    })
  >;
};

export type VisitQueryVariables = {
  id: Scalars['String'];
};

export type VisitQuery = { __typename?: 'Query' } & {
  visit: Maybe<{ __typename?: 'Visit' } & VisitFragment>;
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>;
};
export const VisitOrderFragmentDoc = gql`
  fragment VisitOrder on Order {
    id
    createdAt
    createdAt
  }
`;
export const VisitRateFragmentDoc = gql`
  fragment VisitRate on Rate {
    id
    score
    food
    service
    environment
    experience
    createdAt
    updatedAt
  }
`;
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    name
    firstName
    lastName
    role
    email
    createdAt
    updatedAt
    placeCount
    visitCount
  }
`;
export const PlaceAddressFragmentDoc = gql`
  fragment PlaceAddress on Address {
    id
    formatted
    street
    streetNumber
    sublocality
    city
    country
  }
`;
export const PlaceTagFragmentDoc = gql`
  fragment PlaceTag on Tag {
    id
    title
    createdAt
  }
`;
export const PlaceFragmentDoc = gql`
  fragment Place on Place {
    id
    googlePlaceId
    name
    slug
    lat
    lng
    priceLevel
    url
    address {
      ...PlaceAddress
    }
    tags {
      ...PlaceTag
    }
    createdAt
    updatedAt
    averageScore
    visitCount
  }
  ${PlaceAddressFragmentDoc}
  ${PlaceTagFragmentDoc}
`;
export const VisitFragmentDoc = gql`
  fragment Visit on Visit {
    id
    comment
    visitDate
    orders {
      ...VisitOrder
    }
    rate {
      ...VisitRate
    }
    user {
      ...User
    }
    place {
      ...Place
    }
    createdAt
    updatedAt
  }
  ${VisitOrderFragmentDoc}
  ${VisitRateFragmentDoc}
  ${UserFragmentDoc}
  ${PlaceFragmentDoc}
`;
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>
) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export const MePlacesDocument = gql`
  query MePlaces {
    me {
      placeCount
      places {
        ... on Place {
          visits {
            ...Visit
          }
        }
      }
    }
  }
  ${VisitFragmentDoc}
`;

export function useMePlacesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MePlacesQueryVariables>
) {
  return ReactApolloHooks.useQuery<MePlacesQuery, MePlacesQueryVariables>(
    MePlacesDocument,
    baseOptions
  );
}
export const MeVisitsDocument = gql`
  query MeVisits {
    me {
      visitCount
      visits {
        ...Visit
      }
    }
  }
  ${VisitFragmentDoc}
`;

export function useMeVisitsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeVisitsQueryVariables>
) {
  return ReactApolloHooks.useQuery<MeVisitsQuery, MeVisitsQueryVariables>(
    MeVisitsDocument,
    baseOptions
  );
}
export const PlaceDocument = gql`
  query Place($slug: String, $id: String) {
    place(slug: $slug, id: $id) {
      ... on Place {
        visits {
          ...Visit
        }
      }
    }
  }
  ${VisitFragmentDoc}
`;

export function usePlaceQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<PlaceQueryVariables>
) {
  return ReactApolloHooks.useQuery<PlaceQuery, PlaceQueryVariables>(
    PlaceDocument,
    baseOptions
  );
}
export const VisitDocument = gql`
  query Visit($id: String!) {
    visit(id: $id) {
      ...Visit
    }
  }
  ${VisitFragmentDoc}
`;

export function useVisitQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<VisitQueryVariables>
) {
  return ReactApolloHooks.useQuery<VisitQuery, VisitQueryVariables>(
    VisitDocument,
    baseOptions
  );
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
    }
  }
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
