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

export type AddVisitInput = {
  place: PlaceInput;
  visit: VisitInput;
};

export type AddVisitResponse = {
  __typename?: 'AddVisitResponse';
  saved: Scalars['Boolean'];
};

export type Contact = {
  __typename?: 'Contact';
  phone?: Maybe<Scalars['String']>;
  formattedPhone?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  facebookUsername?: Maybe<Scalars['String']>;
  facebookName?: Maybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  address: Scalars['String'];
  crossStreet?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  distance?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['String']>;
  cc?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  formattedAddress: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  register?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
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
  foursquareId: Scalars['String'];
  user: User;
  slug: Scalars['String'];
  types: Array<PlaceType>;
  priceLevel?: Maybe<PriceLevel>;
  tags?: Maybe<Array<Tag>>;
  visits: Array<Visit>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  visitCount: Scalars['Float'];
  averageScore: Scalars['Float'];
  data: PlaceData;
};

export type PlaceVisitsArgs = {
  limit?: Maybe<Scalars['Float']>;
};

export type PlaceData = {
  __typename?: 'PlaceData';
  id: Scalars['String'];
  name: Scalars['String'];
  contact: Contact;
  location: Location;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type PlaceInput = {
  id?: Maybe<Scalars['Float']>;
  foursquareId: Scalars['String'];
  priceLevel?: Maybe<PriceLevel>;
  types: Array<PlaceType>;
  tags: Array<Scalars['String']>;
};

export type PlaceSearchInput = {
  query: Scalars['String'];
  near?: Maybe<Scalars['String']>;
  position?: Maybe<PositionInput>;
};

export type PlaceSearchItem = {
  __typename?: 'PlaceSearchItem';
  foursquareId: Scalars['String'];
  name: Scalars['String'];
  address: Scalars['String'];
  visits: Scalars['Float'];
  coordinates: Position;
  types: Array<Scalars['String']>;
};

export type PlaceSearchResult = {
  __typename?: 'PlaceSearchResult';
  places: Array<PlaceSearchItem>;
};

/** Type of place */
export enum PlaceType {
  Restaurant = 'Restaurant',
  Cafe = 'Cafe'
}

export type Position = {
  __typename?: 'Position';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type PositionInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

/** Price level of place */
export enum PriceLevel {
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
  searchPlace?: Maybe<PlaceSearchResult>;
};

export type QueryVisitArgs = {
  id: Scalars['String'];
};

export type QueryPlaceArgs = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type QuerySearchPlaceArgs = {
  filter: PlaceSearchInput;
};

export type Rate = {
  __typename?: 'Rate';
  id: Scalars['ID'];
  name: Scalars['String'];
  score: Scalars['Float'];
  calculatedScore: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  children?: Maybe<Array<Rate>>;
};

export type RateInput = {
  name: Scalars['String'];
  score: Scalars['Float'];
  calculatedScore?: Maybe<Scalars['Boolean']>;
  children?: Maybe<Array<RateInput>>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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
  ratings: Array<Rate>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  place: Place;
  user: User;
};

export type VisitInput = {
  visitDate: Scalars['DateTime'];
  comment?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Scalars['String']>>;
  ratings: Array<RateInput>;
};
export type PlaceFragment = { __typename?: 'Place' } & Pick<
  Place,
  | 'id'
  | 'foursquareId'
  | 'slug'
  | 'priceLevel'
  | 'types'
  | 'averageScore'
  | 'visitCount'
  | 'createdAt'
  | 'updatedAt'
> & {
    tags: Maybe<Array<{ __typename?: 'Tag' } & PlaceTagFragment>>;
    data: { __typename?: 'PlaceData' } & PlaceDataFragment;
    user: { __typename?: 'User' } & UserFragment;
  };

export type PlaceDataFragment = { __typename?: 'PlaceData' } & Pick<
  PlaceData,
  'id' | 'name' | 'url' | 'description'
> & {
    contact: { __typename?: 'Contact' } & ContactFragment;
    location: { __typename?: 'Location' } & LocationFragment;
  };

export type LocationFragment = { __typename?: 'Location' } & Pick<
  Location,
  | 'address'
  | 'crossStreet'
  | 'lat'
  | 'lng'
  | 'distance'
  | 'postalCode'
  | 'cc'
  | 'city'
  | 'state'
  | 'country'
  | 'formattedAddress'
>;

export type ContactFragment = { __typename?: 'Contact' } & Pick<
  Contact,
  | 'phone'
  | 'formattedPhone'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'facebookUsername'
  | 'facebookName'
>;

export type PlaceTagFragment = { __typename?: 'Tag' } & Pick<
  Tag,
  'id' | 'name' | 'createdAt'
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
    ratings: Array<
      { __typename?: 'Rate' } & {
        children: Maybe<Array<{ __typename?: 'Rate' } & VisitRateFragment>>;
      } & VisitRateFragment
    >;
    user: { __typename?: 'User' } & UserFragment;
    place: { __typename?: 'Place' } & PlaceFragment;
  };

export type VisitOrderFragment = { __typename?: 'Order' } & Pick<
  Order,
  'id' | 'title' | 'createdAt' | 'updatedAt'
>;

export type VisitRateFragment = { __typename?: 'Rate' } & Pick<
  Rate,
  'id' | 'name' | 'score' | 'calculatedScore' | 'createdAt' | 'updatedAt'
>;

export type MeQueryVariables = {};

export type MeQuery = { __typename?: 'Query' } & {
  me: Maybe<{ __typename?: 'User' } & UserFragment>;
};

export type MePlacesQueryVariables = {};

export type MePlacesQuery = { __typename?: 'Query' } & {
  me: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'placeCount'> & {
        places: Array<
          { __typename?: 'Place' } & {
            visits: Array<{ __typename?: 'Visit' } & VisitFragment>;
          } & PlaceFragment
        >;
      }
  >;
};

export type MeVisitsQueryVariables = {};

export type MeVisitsQuery = { __typename?: 'Query' } & {
  me: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'visitCount'> & {
        visits: Array<{ __typename?: 'Visit' } & VisitFragment>;
      }
  >;
};

export type PlaceQueryVariables = {
  slug?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type PlaceQuery = { __typename?: 'Query' } & {
  place: Maybe<
    { __typename?: 'Place' } & {
      visits: Array<{ __typename?: 'Visit' } & VisitFragment>;
    } & PlaceFragment
  >;
};

export type SearchPlaceQueryVariables = {
  filter: PlaceSearchInput;
};

export type SearchPlaceQuery = { __typename?: 'Query' } & {
  searchPlace: Maybe<
    { __typename?: 'PlaceSearchResult' } & {
      places: Array<
        { __typename?: 'PlaceSearchItem' } & Pick<
          PlaceSearchItem,
          'foursquareId' | 'name' | 'address' | 'visits' | 'types'
        > & {
            coordinates: { __typename?: 'Position' } & Pick<
              Position,
              'lat' | 'lng'
            >;
          }
      >;
    }
  >;
};

export type VisitQueryVariables = {
  id: Scalars['String'];
};

export type VisitQuery = { __typename?: 'Query' } & {
  visit: Maybe<{ __typename?: 'Visit' } & VisitFragment>;
};

export type AddVisitMutationVariables = {
  data: AddVisitInput;
};

export type AddVisitMutation = { __typename?: 'Mutation' } & {
  addVisit: { __typename?: 'AddVisitResponse' } & Pick<
    AddVisitResponse,
    'saved'
  >;
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>;
};

export type RegisterMutationVariables = {
  data: UserRegisterInput;
};

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>;
};
export const VisitOrderFragmentDoc = gql`
  fragment VisitOrder on Order {
    id
    title
    createdAt
    updatedAt
  }
`;
export const VisitRateFragmentDoc = gql`
  fragment VisitRate on Rate {
    id
    name
    score
    calculatedScore
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
export const PlaceTagFragmentDoc = gql`
  fragment PlaceTag on Tag {
    id
    name
    createdAt
  }
`;
export const ContactFragmentDoc = gql`
  fragment Contact on Contact {
    phone
    formattedPhone
    twitter
    instagram
    facebook
    facebookUsername
    facebookName
  }
`;
export const LocationFragmentDoc = gql`
  fragment Location on Location {
    address
    crossStreet
    lat
    lng
    distance
    postalCode
    cc
    city
    state
    country
    formattedAddress
  }
`;
export const PlaceDataFragmentDoc = gql`
  fragment PlaceData on PlaceData {
    id
    name
    contact {
      ...Contact
    }
    location {
      ...Location
    }
    url
    description
  }
  ${ContactFragmentDoc}
  ${LocationFragmentDoc}
`;
export const PlaceFragmentDoc = gql`
  fragment Place on Place {
    id
    foursquareId
    slug
    priceLevel
    types
    averageScore
    visitCount
    tags {
      ...PlaceTag
    }
    data {
      ...PlaceData
    }
    user {
      ...User
    }
    createdAt
    updatedAt
  }
  ${PlaceTagFragmentDoc}
  ${PlaceDataFragmentDoc}
  ${UserFragmentDoc}
`;
export const VisitFragmentDoc = gql`
  fragment Visit on Visit {
    id
    orders {
      ...VisitOrder
    }
    ratings {
      ...VisitRate
      children {
        ...VisitRate
      }
    }
    user {
      ...User
    }
    comment
    visitDate
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
      id
      placeCount
      places {
        ...Place
        visits {
          ...Visit
        }
      }
    }
  }
  ${PlaceFragmentDoc}
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
      id
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
  query Place($slug: String, $id: Float) {
    place(slug: $slug, id: $id) {
      ...Place
      visits {
        ...Visit
      }
    }
  }
  ${PlaceFragmentDoc}
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
export const SearchPlaceDocument = gql`
  query SearchPlace($filter: PlaceSearchInput!) {
    searchPlace(filter: $filter) {
      places {
        foursquareId
        name
        address
        visits
        coordinates {
          lat
          lng
        }
        types
      }
    }
  }
`;

export function useSearchPlaceQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<SearchPlaceQueryVariables>
) {
  return ReactApolloHooks.useQuery<SearchPlaceQuery, SearchPlaceQueryVariables>(
    SearchPlaceDocument,
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
export const AddVisitDocument = gql`
  mutation AddVisit($data: AddVisitInput!) {
    addVisit(data: $data) {
      saved
    }
  }
`;
export type AddVisitMutationFn = ReactApollo.MutationFn<
  AddVisitMutation,
  AddVisitMutationVariables
>;

export function useAddVisitMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddVisitMutation,
    AddVisitMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddVisitMutation,
    AddVisitMutationVariables
  >(AddVisitDocument, baseOptions);
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
export const RegisterDocument = gql`
  mutation Register($data: UserRegisterInput!) {
    register(data: $data) {
      id
    }
  }
`;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>;

export function useRegisterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
