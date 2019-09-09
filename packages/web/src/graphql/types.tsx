/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type AddVisitInput = {
  providerId: Scalars['String'],
  visitDate: Scalars['DateTime'],
  comment?: Maybe<Scalars['String']>,
  orders?: Maybe<Array<Scalars['String']>>,
  ratings: Array<RateInput>,
};

export type AddVisitResponse = {
   __typename?: 'AddVisitResponse',
  saved: Scalars['Boolean'],
};

export type Contact = {
   __typename?: 'Contact',
  phone?: Maybe<Scalars['String']>,
  formattedPhone?: Maybe<Scalars['String']>,
  twitter?: Maybe<Scalars['String']>,
  instagram?: Maybe<Scalars['String']>,
  facebook?: Maybe<Scalars['String']>,
  facebookUsername?: Maybe<Scalars['String']>,
  facebookName?: Maybe<Scalars['String']>,
};


export type Location = {
   __typename?: 'Location',
  address?: Maybe<Scalars['String']>,
  crossStreet?: Maybe<Scalars['String']>,
  lat?: Maybe<Scalars['Float']>,
  lng?: Maybe<Scalars['Float']>,
  distance?: Maybe<Scalars['Float']>,
  postalCode?: Maybe<Scalars['String']>,
  cc?: Maybe<Scalars['String']>,
  city: Scalars['String'],
  state?: Maybe<Scalars['String']>,
  country: Scalars['String'],
  formattedAddress: Array<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  login?: Maybe<User>,
  register?: Maybe<User>,
  logout?: Maybe<Scalars['Boolean']>,
  addVisit: AddVisitResponse,
  toggleWantToVisit: Scalars['Boolean'],
  setPriceLevel: PriceLevel,
  addTag: Tag,
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  data: UserRegisterInput
};


export type MutationAddVisitArgs = {
  data: AddVisitInput
};


export type MutationToggleWantToVisitArgs = {
  providerId: Scalars['String']
};


export type MutationSetPriceLevelArgs = {
  priceLevel: Scalars['Float'],
  providerId: Scalars['String']
};


export type MutationAddTagArgs = {
  name: Scalars['String'],
  providerId: Scalars['String']
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
  title: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Place = {
   __typename?: 'Place',
  id?: Maybe<Scalars['ID']>,
  foursquareId: Scalars['String'],
  user?: Maybe<User>,
  types?: Maybe<Array<PlaceType>>,
  priceLevel: PriceLevel,
  comment?: Maybe<Scalars['String']>,
  tags: Array<Tag>,
  visits: Array<Visit>,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  visitCount: Scalars['Float'],
  averageScore: Scalars['Float'],
  data: PlaceData,
  hasVisited: Scalars['Boolean'],
  wantToVisit: Scalars['Boolean'],
};


export type PlaceVisitsArgs = {
  limit?: Maybe<Scalars['Float']>
};

export type PlaceData = {
   __typename?: 'PlaceData',
  id: Scalars['String'],
  name: Scalars['String'],
  contact: Contact,
  location: Location,
  url?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type PlaceInput = {
  id?: Maybe<Scalars['Float']>,
  foursquareId: Scalars['String'],
  priceLevel?: Maybe<PriceLevel>,
  types: Array<PlaceType>,
  tags: Array<Scalars['String']>,
};

export type PlaceSearchInput = {
  query: Scalars['String'],
  near?: Maybe<Scalars['String']>,
  position?: Maybe<PositionInput>,
};

export type PlaceSearchItem = {
   __typename?: 'PlaceSearchItem',
  foursquareId: Scalars['String'],
  name: Scalars['String'],
  address: Scalars['String'],
  visits: Scalars['Float'],
  coordinates: Position,
  types: Array<Scalars['String']>,
};

export type PlaceSearchResult = {
   __typename?: 'PlaceSearchResult',
  places: Array<PlaceSearchItem>,
};

/** Type of place */
export enum PlaceType {
  Restaurant = 'Restaurant',
  Cafe = 'Cafe'
}

export type Position = {
   __typename?: 'Position',
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

export type PositionInput = {
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

/** Price level of place */
export enum PriceLevel {
  NotSet = 'NotSet',
  Inexpensive = 'Inexpensive',
  Moderate = 'Moderate',
  Expensive = 'Expensive',
  Exclusive = 'Exclusive'
}

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  visit?: Maybe<Visit>,
  place?: Maybe<Place>,
  placeBasicDetails?: Maybe<PlaceSearchItem>,
  searchPlace?: Maybe<PlaceSearchResult>,
};


export type QueryVisitArgs = {
  id: Scalars['String']
};


export type QueryPlaceArgs = {
  providerId: Scalars['String']
};


export type QueryPlaceBasicDetailsArgs = {
  id: Scalars['String']
};


export type QuerySearchPlaceArgs = {
  filter: PlaceSearchInput
};

export type Rate = {
   __typename?: 'Rate',
  id: Scalars['ID'],
  name: Scalars['String'],
  score: Scalars['Float'],
  calculatedScore: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  children?: Maybe<Array<Rate>>,
};

export type RateInput = {
  name: Scalars['String'],
  score: Scalars['Float'],
  calculatedScore?: Maybe<Scalars['Boolean']>,
  children?: Maybe<Array<RateInput>>,
};

export type Tag = {
   __typename?: 'Tag',
  id: Scalars['ID'],
  name: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  role: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  name: Scalars['String'],
  email: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  places: Array<Place>,
  visits: Array<Visit>,
  placeCount: Scalars['Float'],
  visitCount: Scalars['Float'],
};

export type UserRegisterInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Visit = {
   __typename?: 'Visit',
  id: Scalars['ID'],
  comment?: Maybe<Scalars['String']>,
  visitDate: Scalars['DateTime'],
  orders?: Maybe<Array<Order>>,
  ratings: Array<Rate>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  place: Place,
  user: User,
};

export type WantToVisit = {
   __typename?: 'WantToVisit',
  id: Scalars['ID'],
  providerId: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
};
export type PlaceFragment = (
  { __typename?: 'Place' }
  & Pick<Place, 'id' | 'foursquareId' | 'priceLevel' | 'types' | 'averageScore' | 'visitCount' | 'wantToVisit' | 'hasVisited' | 'createdAt' | 'updatedAt'>
  & { tags: Array<{ __typename?: 'Tag' }
    & PlaceTagFragment
  >, data: { __typename?: 'PlaceData' }
    & PlaceDataFragment
  , user: Maybe<{ __typename?: 'User' }
    & UserFragment
  > }
);

export type PlaceBasicDetailsFragment = (
  { __typename?: 'PlaceSearchItem' }
  & Pick<PlaceSearchItem, 'foursquareId' | 'name' | 'address' | 'visits' | 'types'>
  & { coordinates: (
    { __typename?: 'Position' }
    & Pick<Position, 'lat' | 'lng'>
  ) }
);

export type PlaceDataFragment = (
  { __typename?: 'PlaceData' }
  & Pick<PlaceData, 'id' | 'name' | 'url' | 'description'>
  & { contact: { __typename?: 'Contact' }
    & ContactFragment
  , location: { __typename?: 'Location' }
    & LocationFragment
   }
);

export type LocationFragment = (
  { __typename?: 'Location' }
  & Pick<Location, 'address' | 'crossStreet' | 'lat' | 'lng' | 'distance' | 'postalCode' | 'cc' | 'city' | 'state' | 'country' | 'formattedAddress'>
);

export type ContactFragment = (
  { __typename?: 'Contact' }
  & Pick<Contact, 'phone' | 'formattedPhone' | 'twitter' | 'instagram' | 'facebook' | 'facebookUsername' | 'facebookName'>
);

export type PlaceTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'id' | 'name' | 'createdAt'>
);

export type TagFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'id' | 'name' | 'createdAt' | 'updatedAt'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'firstName' | 'lastName' | 'role' | 'email' | 'createdAt' | 'updatedAt' | 'placeCount' | 'visitCount'>
);

export type VisitFragment = (
  { __typename?: 'Visit' }
  & Pick<Visit, 'id' | 'comment' | 'visitDate' | 'createdAt' | 'updatedAt'>
  & { orders: Maybe<Array<{ __typename?: 'Order' }
    & VisitOrderFragment
  >>, ratings: Array<(
    { __typename?: 'Rate' }
    & { children: Maybe<Array<{ __typename?: 'Rate' }
      & VisitRateFragment
    >> }
  )
    & VisitRateFragment
  >, user: { __typename?: 'User' }
    & UserFragment
  , place: { __typename?: 'Place' }
    & PlaceFragment
   }
);

export type VisitOrderFragment = (
  { __typename?: 'Order' }
  & Pick<Order, 'id' | 'title' | 'createdAt' | 'updatedAt'>
);

export type VisitRateFragment = (
  { __typename?: 'Rate' }
  & Pick<Rate, 'id' | 'name' | 'score' | 'calculatedScore' | 'createdAt' | 'updatedAt'>
);

export type AddTagMutationVariables = {
  providerId: Scalars['String'],
  name: Scalars['String']
};


export type AddTagMutation = (
  { __typename?: 'Mutation' }
  & { addTag: { __typename?: 'Tag' }
    & TagFragment
   }
);

export type AddVisitMutationVariables = {
  data: AddVisitInput
};


export type AddVisitMutation = (
  { __typename?: 'Mutation' }
  & { addVisit: (
    { __typename?: 'AddVisitResponse' }
    & Pick<AddVisitResponse, 'saved'>
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type RegisterMutationVariables = {
  data: UserRegisterInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type SetPriceLevelMutationVariables = {
  providerId: Scalars['String'],
  priceLevel: Scalars['Float']
};


export type SetPriceLevelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setPriceLevel'>
);

export type ToggleWantToVisitMutationVariables = {
  providerId: Scalars['String']
};


export type ToggleWantToVisitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleWantToVisit'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<{ __typename?: 'User' }
    & UserFragment
  > }
);

export type MePlacesQueryVariables = {};


export type MePlacesQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'placeCount'>
    & { places: Array<(
      { __typename?: 'Place' }
      & { visits: Array<{ __typename?: 'Visit' }
        & VisitFragment
      > }
    )
      & PlaceFragment
    > }
  )> }
);

export type MeVisitsQueryVariables = {};


export type MeVisitsQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'visitCount'>
    & { visits: Array<{ __typename?: 'Visit' }
      & VisitFragment
    > }
  )> }
);

export type PlaceQueryVariables = {
  providerId: Scalars['String']
};


export type PlaceQuery = (
  { __typename?: 'Query' }
  & { place: Maybe<(
    { __typename?: 'Place' }
    & { visits: Array<{ __typename?: 'Visit' }
      & VisitFragment
    > }
  )
    & PlaceFragment
  > }
);

export type PlaceBasicDetailsQueryVariables = {
  id: Scalars['String']
};


export type PlaceBasicDetailsQuery = (
  { __typename?: 'Query' }
  & { placeBasicDetails: Maybe<{ __typename?: 'PlaceSearchItem' }
    & PlaceBasicDetailsFragment
  > }
);

export type SearchPlaceQueryVariables = {
  filter: PlaceSearchInput
};


export type SearchPlaceQuery = (
  { __typename?: 'Query' }
  & { searchPlace: Maybe<(
    { __typename?: 'PlaceSearchResult' }
    & { places: Array<{ __typename?: 'PlaceSearchItem' }
      & PlaceBasicDetailsFragment
    > }
  )> }
);

export type VisitQueryVariables = {
  id: Scalars['String']
};


export type VisitQuery = (
  { __typename?: 'Query' }
  & { visit: Maybe<{ __typename?: 'Visit' }
    & VisitFragment
  > }
);
export const PlaceBasicDetailsFragmentDoc = gql`
    fragment PlaceBasicDetails on PlaceSearchItem {
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
    `;
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  id
  name
  createdAt
  updatedAt
}
    `;
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
${LocationFragmentDoc}`;
export const PlaceFragmentDoc = gql`
    fragment Place on Place {
  id
  foursquareId
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
  wantToVisit
  hasVisited
  createdAt
  updatedAt
}
    ${PlaceTagFragmentDoc}
${PlaceDataFragmentDoc}
${UserFragmentDoc}`;
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
${PlaceFragmentDoc}`;
export const AddTagDocument = gql`
    mutation AddTag($providerId: String!, $name: String!) {
  addTag(providerId: $providerId, name: $name) {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export type AddTagMutationFn = ApolloReactCommon.MutationFunction<AddTagMutation, AddTagMutationVariables>;

    export function useAddTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTagMutation, AddTagMutationVariables>) {
      return ApolloReactHooks.useMutation<AddTagMutation, AddTagMutationVariables>(AddTagDocument, baseOptions);
    }
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = ApolloReactCommon.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const AddVisitDocument = gql`
    mutation AddVisit($data: AddVisitInput!) {
  addVisit(data: $data) {
    saved
  }
}
    `;
export type AddVisitMutationFn = ApolloReactCommon.MutationFunction<AddVisitMutation, AddVisitMutationVariables>;

    export function useAddVisitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddVisitMutation, AddVisitMutationVariables>) {
      return ApolloReactHooks.useMutation<AddVisitMutation, AddVisitMutationVariables>(AddVisitDocument, baseOptions);
    }
export type AddVisitMutationHookResult = ReturnType<typeof useAddVisitMutation>;
export type AddVisitMutationResult = ApolloReactCommon.MutationResult<AddVisitMutation>;
export type AddVisitMutationOptions = ApolloReactCommon.BaseMutationOptions<AddVisitMutation, AddVisitMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

    export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
      return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
    }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: UserRegisterInput!) {
  register(data: $data) {
    id
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

    export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
      return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
    }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetPriceLevelDocument = gql`
    mutation SetPriceLevel($providerId: String!, $priceLevel: Float!) {
  setPriceLevel(providerId: $providerId, priceLevel: $priceLevel)
}
    `;
export type SetPriceLevelMutationFn = ApolloReactCommon.MutationFunction<SetPriceLevelMutation, SetPriceLevelMutationVariables>;

    export function useSetPriceLevelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetPriceLevelMutation, SetPriceLevelMutationVariables>) {
      return ApolloReactHooks.useMutation<SetPriceLevelMutation, SetPriceLevelMutationVariables>(SetPriceLevelDocument, baseOptions);
    }
export type SetPriceLevelMutationHookResult = ReturnType<typeof useSetPriceLevelMutation>;
export type SetPriceLevelMutationResult = ApolloReactCommon.MutationResult<SetPriceLevelMutation>;
export type SetPriceLevelMutationOptions = ApolloReactCommon.BaseMutationOptions<SetPriceLevelMutation, SetPriceLevelMutationVariables>;
export const ToggleWantToVisitDocument = gql`
    mutation ToggleWantToVisit($providerId: String!) {
  toggleWantToVisit(providerId: $providerId)
}
    `;
export type ToggleWantToVisitMutationFn = ApolloReactCommon.MutationFunction<ToggleWantToVisitMutation, ToggleWantToVisitMutationVariables>;

    export function useToggleWantToVisitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleWantToVisitMutation, ToggleWantToVisitMutationVariables>) {
      return ApolloReactHooks.useMutation<ToggleWantToVisitMutation, ToggleWantToVisitMutationVariables>(ToggleWantToVisitDocument, baseOptions);
    }
export type ToggleWantToVisitMutationHookResult = ReturnType<typeof useToggleWantToVisitMutation>;
export type ToggleWantToVisitMutationResult = ApolloReactCommon.MutationResult<ToggleWantToVisitMutation>;
export type ToggleWantToVisitMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleWantToVisitMutation, ToggleWantToVisitMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

    export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
      return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
    }
      export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
      
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
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
${VisitFragmentDoc}`;

    export function useMePlacesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MePlacesQuery, MePlacesQueryVariables>) {
      return ApolloReactHooks.useQuery<MePlacesQuery, MePlacesQueryVariables>(MePlacesDocument, baseOptions);
    }
      export function useMePlacesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MePlacesQuery, MePlacesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MePlacesQuery, MePlacesQueryVariables>(MePlacesDocument, baseOptions);
      }
      
export type MePlacesQueryHookResult = ReturnType<typeof useMePlacesQuery>;
export type MePlacesQueryResult = ApolloReactCommon.QueryResult<MePlacesQuery, MePlacesQueryVariables>;
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
    ${VisitFragmentDoc}`;

    export function useMeVisitsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeVisitsQuery, MeVisitsQueryVariables>) {
      return ApolloReactHooks.useQuery<MeVisitsQuery, MeVisitsQueryVariables>(MeVisitsDocument, baseOptions);
    }
      export function useMeVisitsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeVisitsQuery, MeVisitsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MeVisitsQuery, MeVisitsQueryVariables>(MeVisitsDocument, baseOptions);
      }
      
export type MeVisitsQueryHookResult = ReturnType<typeof useMeVisitsQuery>;
export type MeVisitsQueryResult = ApolloReactCommon.QueryResult<MeVisitsQuery, MeVisitsQueryVariables>;
export const PlaceDocument = gql`
    query Place($providerId: String!) {
  place(providerId: $providerId) {
    ...Place
    visits {
      ...Visit
    }
  }
}
    ${PlaceFragmentDoc}
${VisitFragmentDoc}`;

    export function usePlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
      return ApolloReactHooks.useQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, baseOptions);
    }
      export function usePlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, baseOptions);
      }
      
export type PlaceQueryHookResult = ReturnType<typeof usePlaceQuery>;
export type PlaceQueryResult = ApolloReactCommon.QueryResult<PlaceQuery, PlaceQueryVariables>;
export const PlaceBasicDetailsDocument = gql`
    query PlaceBasicDetails($id: String!) {
  placeBasicDetails(id: $id) {
    ...PlaceBasicDetails
  }
}
    ${PlaceBasicDetailsFragmentDoc}`;

    export function usePlaceBasicDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceBasicDetailsQuery, PlaceBasicDetailsQueryVariables>) {
      return ApolloReactHooks.useQuery<PlaceBasicDetailsQuery, PlaceBasicDetailsQueryVariables>(PlaceBasicDetailsDocument, baseOptions);
    }
      export function usePlaceBasicDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceBasicDetailsQuery, PlaceBasicDetailsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PlaceBasicDetailsQuery, PlaceBasicDetailsQueryVariables>(PlaceBasicDetailsDocument, baseOptions);
      }
      
export type PlaceBasicDetailsQueryHookResult = ReturnType<typeof usePlaceBasicDetailsQuery>;
export type PlaceBasicDetailsQueryResult = ApolloReactCommon.QueryResult<PlaceBasicDetailsQuery, PlaceBasicDetailsQueryVariables>;
export const SearchPlaceDocument = gql`
    query SearchPlace($filter: PlaceSearchInput!) {
  searchPlace(filter: $filter) {
    places {
      ...PlaceBasicDetails
    }
  }
}
    ${PlaceBasicDetailsFragmentDoc}`;

    export function useSearchPlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchPlaceQuery, SearchPlaceQueryVariables>) {
      return ApolloReactHooks.useQuery<SearchPlaceQuery, SearchPlaceQueryVariables>(SearchPlaceDocument, baseOptions);
    }
      export function useSearchPlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchPlaceQuery, SearchPlaceQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<SearchPlaceQuery, SearchPlaceQueryVariables>(SearchPlaceDocument, baseOptions);
      }
      
export type SearchPlaceQueryHookResult = ReturnType<typeof useSearchPlaceQuery>;
export type SearchPlaceQueryResult = ApolloReactCommon.QueryResult<SearchPlaceQuery, SearchPlaceQueryVariables>;
export const VisitDocument = gql`
    query Visit($id: String!) {
  visit(id: $id) {
    ...Visit
  }
}
    ${VisitFragmentDoc}`;

    export function useVisitQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VisitQuery, VisitQueryVariables>) {
      return ApolloReactHooks.useQuery<VisitQuery, VisitQueryVariables>(VisitDocument, baseOptions);
    }
      export function useVisitLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VisitQuery, VisitQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<VisitQuery, VisitQueryVariables>(VisitDocument, baseOptions);
      }
      
export type VisitQueryHookResult = ReturnType<typeof useVisitQuery>;
export type VisitQueryResult = ApolloReactCommon.QueryResult<VisitQuery, VisitQueryVariables>;