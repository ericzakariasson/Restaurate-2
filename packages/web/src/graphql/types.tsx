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

export type Address = {
   __typename?: 'Address',
  formatted: Scalars['String'],
  house?: Maybe<Scalars['String']>,
  street?: Maybe<Scalars['String']>,
  postalCode?: Maybe<Scalars['String']>,
  district?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  county?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  countryCode?: Maybe<Scalars['String']>,
};

export type AddVisitInput = {
  providerPlaceId: Scalars['String'],
  visitDate: Scalars['DateTime'],
  comment?: Maybe<Scalars['String']>,
  orders?: Maybe<Array<Scalars['String']>>,
  ratings: Array<RateInput>,
};

export type Category = {
   __typename?: 'Category',
  id: Scalars['String'],
  title: Scalars['String'],
};

export type Contact = {
   __typename?: 'Contact',
  phone?: Maybe<Array<KeyValuePair>>,
  website?: Maybe<Array<KeyValuePair>>,
};


export type EditVisitInput = {
  visitId: Scalars['String'],
  visitDate: Scalars['DateTime'],
  comment?: Maybe<Scalars['String']>,
  orders: Array<Scalars['String']>,
  ratings: Array<RateInput>,
};

export type IPosition = {
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

export type KeyValuePair = {
   __typename?: 'KeyValuePair',
  label: Scalars['String'],
  value: Scalars['String'],
};

export type Location = {
   __typename?: 'Location',
  position: Position,
  address: Address,
};

export type Mutation = {
   __typename?: 'Mutation',
  login?: Maybe<User>,
  logout: Scalars['Boolean'],
  register?: Maybe<User>,
  addVisit: VisitResponse,
  editVisit: VisitResponse,
  toggleWantToVisit: Scalars['Boolean'],
  setPriceLevel: PriceLevel,
  addTag: Tag,
  removeTag: Scalars['Float'],
  setComment: Scalars['String'],
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


export type MutationEditVisitArgs = {
  data: EditVisitInput
};


export type MutationToggleWantToVisitArgs = {
  providerPlaceId: Scalars['String']
};


export type MutationSetPriceLevelArgs = {
  priceLevel: Scalars['Float'],
  providerId: Scalars['String']
};


export type MutationAddTagArgs = {
  name: Scalars['String'],
  providerId: Scalars['String']
};


export type MutationRemoveTagArgs = {
  tagId: Scalars['Float'],
  providerId: Scalars['String']
};


export type MutationSetCommentArgs = {
  comment: Scalars['String'],
  providerId: Scalars['String']
};

export type OpeningHours = {
   __typename?: 'OpeningHours',
  isOpen: Scalars['Boolean'],
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
  providerId: Scalars['ID'],
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
  details: PlaceDetails,
  hasVisited: Scalars['Boolean'],
  wantToVisit: Scalars['Boolean'],
};


export type PlaceVisitsArgs = {
  limit?: Maybe<Scalars['Float']>
};

export type PlaceDetails = {
   __typename?: 'PlaceDetails',
  providerId: Scalars['String'],
  name: Scalars['String'],
  location: Location,
  categories: Array<Category>,
  contact: Contact,
  openingHours?: Maybe<OpeningHours>,
};

export type PlaceDetailsBasic = {
   __typename?: 'PlaceDetailsBasic',
  providerId: Scalars['String'],
  name: Scalars['String'],
  address: Scalars['String'],
  visits: Scalars['Float'],
  position: Position,
  categories: Array<Scalars['String']>,
};

export type PlaceSearchResult = {
   __typename?: 'PlaceSearchResult',
  places: Array<PlaceDetailsBasic>,
};

/** Type of place */
export enum PlaceType {
  Restaurant = 'Restaurant',
  Cafe = 'Cafe'
}

export type Position = IPosition & {
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
  searchPlace: PlaceSearchResult,
  placeDetails: PlaceDetails,
  place?: Maybe<Place>,
  wantToVisitList: Array<PlaceDetailsBasic>,
};


export type QueryVisitArgs = {
  id: Scalars['String']
};


export type QuerySearchPlaceArgs = {
  position?: Maybe<PositionInput>,
  query: Scalars['String']
};


export type QueryPlaceDetailsArgs = {
  providerId: Scalars['String']
};


export type QueryPlaceArgs = {
  providerId: Scalars['String']
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
  orders: Array<Order>,
  ratings: Array<Rate>,
  score: Scalars['Float'],
  private: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  place: Place,
  user: User,
};

export type VisitResponse = {
   __typename?: 'VisitResponse',
  saved: Scalars['Boolean'],
  visit: Visit,
};

export type WantToVisit = {
   __typename?: 'WantToVisit',
  id: Scalars['ID'],
  placeProviderId: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
};
export type PlaceDetailsFragment = (
  { __typename?: 'PlaceDetails' }
  & Pick<PlaceDetails, 'providerId' | 'name'>
  & { location: { __typename?: 'Location' }
    & LocationFragment
  , categories: Array<{ __typename?: 'Category' }
    & CategoryFragment
  >, contact: { __typename?: 'Contact' }
    & ContactFragment
  , openingHours: Maybe<{ __typename?: 'OpeningHours' }
    & OpeningHoursFragment
  > }
);

export type LocationFragment = (
  { __typename?: 'Location' }
  & { address: (
    { __typename?: 'Address' }
    & Pick<Address, 'formatted' | 'house' | 'street' | 'district' | 'county' | 'country' | 'countryCode' | 'state' | 'city'>
  ), position: (
    { __typename?: 'Position' }
    & Pick<Position, 'lat' | 'lng'>
  ) }
);

export type ContactFragment = (
  { __typename?: 'Contact' }
  & { phone: Maybe<Array<(
    { __typename?: 'KeyValuePair' }
    & Pick<KeyValuePair, 'label' | 'value'>
  )>>, website: Maybe<Array<(
    { __typename?: 'KeyValuePair' }
    & Pick<KeyValuePair, 'label' | 'value'>
  )>> }
);

export type CategoryFragment = (
  { __typename?: 'Category' }
  & Pick<Category, 'id' | 'title'>
);

export type OpeningHoursFragment = (
  { __typename?: 'OpeningHours' }
  & Pick<OpeningHours, 'isOpen'>
);

export type PlaceDetailsBasicFragment = (
  { __typename?: 'PlaceDetailsBasic' }
  & Pick<PlaceDetailsBasic, 'providerId' | 'name' | 'address' | 'visits' | 'categories'>
  & { position: (
    { __typename?: 'Position' }
    & Pick<Position, 'lat' | 'lng'>
  ) }
);

export type PlaceFragment = (
  { __typename?: 'Place' }
  & Pick<Place, 'id' | 'providerId' | 'priceLevel' | 'types' | 'averageScore' | 'visitCount' | 'comment' | 'wantToVisit' | 'hasVisited' | 'createdAt' | 'updatedAt'>
  & { tags: Array<{ __typename?: 'Tag' }
    & PlaceTagFragment
  >, details: { __typename?: 'PlaceDetails' }
    & PlaceDetailsFragment
  , user: Maybe<{ __typename?: 'User' }
    & UserFragment
  > }
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
  & Pick<Visit, 'id' | 'score' | 'comment' | 'visitDate' | 'createdAt' | 'updatedAt'>
  & { orders: Array<{ __typename?: 'Order' }
    & VisitOrderFragment
  >, ratings: Array<(
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
    { __typename?: 'VisitResponse' }
    & Pick<VisitResponse, 'saved'>
  ) }
);

export type EditVisitMutationVariables = {
  data: EditVisitInput
};


export type EditVisitMutation = (
  { __typename?: 'Mutation' }
  & { editVisit: (
    { __typename?: 'VisitResponse' }
    & Pick<VisitResponse, 'saved'>
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

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
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

export type RemoveTagMutationVariables = {
  providerId: Scalars['String'],
  tagId: Scalars['Float']
};


export type RemoveTagMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeTag'>
);

export type SetCommentMutationVariables = {
  providerId: Scalars['String'],
  comment: Scalars['String']
};


export type SetCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setComment'>
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
  providerPlaceId: Scalars['String']
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

export type PlaceDetailsQueryVariables = {
  providerId: Scalars['String']
};


export type PlaceDetailsQuery = (
  { __typename?: 'Query' }
  & { placeDetails: { __typename?: 'PlaceDetails' }
    & PlaceDetailsFragment
   }
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

export type SearchPlaceQueryVariables = {
  query: Scalars['String'],
  position?: Maybe<PositionInput>
};


export type SearchPlaceQuery = (
  { __typename?: 'Query' }
  & { searchPlace: (
    { __typename?: 'PlaceSearchResult' }
    & { places: Array<{ __typename?: 'PlaceDetailsBasic' }
      & PlaceDetailsBasicFragment
    > }
  ) }
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

export type WantToVisitListQueryVariables = {};


export type WantToVisitListQuery = (
  { __typename?: 'Query' }
  & { wantToVisitList: Array<{ __typename?: 'PlaceDetailsBasic' }
    & PlaceDetailsBasicFragment
  > }
);
export const PlaceDetailsBasicFragmentDoc = gql`
    fragment PlaceDetailsBasic on PlaceDetailsBasic {
  providerId
  name
  address
  visits
  position {
    lat
    lng
  }
  categories
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
export const LocationFragmentDoc = gql`
    fragment Location on Location {
  address {
    formatted
    house
    street
    district
    county
    country
    countryCode
    state
    city
  }
  position {
    lat
    lng
  }
}
    `;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  title
}
    `;
export const ContactFragmentDoc = gql`
    fragment Contact on Contact {
  phone {
    label
    value
  }
  website {
    label
    value
  }
}
    `;
export const OpeningHoursFragmentDoc = gql`
    fragment OpeningHours on OpeningHours {
  isOpen
}
    `;
export const PlaceDetailsFragmentDoc = gql`
    fragment PlaceDetails on PlaceDetails {
  providerId
  name
  location {
    ...Location
  }
  categories {
    ...Category
  }
  contact {
    ...Contact
  }
  openingHours {
    ...OpeningHours
  }
}
    ${LocationFragmentDoc}
${CategoryFragmentDoc}
${ContactFragmentDoc}
${OpeningHoursFragmentDoc}`;
export const PlaceFragmentDoc = gql`
    fragment Place on Place {
  id
  providerId
  priceLevel
  types
  averageScore
  visitCount
  tags {
    ...PlaceTag
  }
  details {
    ...PlaceDetails
  }
  user {
    ...User
  }
  comment
  wantToVisit
  hasVisited
  createdAt
  updatedAt
}
    ${PlaceTagFragmentDoc}
${PlaceDetailsFragmentDoc}
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
  score
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
export const EditVisitDocument = gql`
    mutation EditVisit($data: EditVisitInput!) {
  editVisit(data: $data) {
    saved
  }
}
    `;
export type EditVisitMutationFn = ApolloReactCommon.MutationFunction<EditVisitMutation, EditVisitMutationVariables>;

    export function useEditVisitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditVisitMutation, EditVisitMutationVariables>) {
      return ApolloReactHooks.useMutation<EditVisitMutation, EditVisitMutationVariables>(EditVisitDocument, baseOptions);
    }
export type EditVisitMutationHookResult = ReturnType<typeof useEditVisitMutation>;
export type EditVisitMutationResult = ApolloReactCommon.MutationResult<EditVisitMutation>;
export type EditVisitMutationOptions = ApolloReactCommon.BaseMutationOptions<EditVisitMutation, EditVisitMutationVariables>;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

    export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
      return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
    }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export const RemoveTagDocument = gql`
    mutation RemoveTag($providerId: String!, $tagId: Float!) {
  removeTag(providerId: $providerId, tagId: $tagId)
}
    `;
export type RemoveTagMutationFn = ApolloReactCommon.MutationFunction<RemoveTagMutation, RemoveTagMutationVariables>;

    export function useRemoveTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTagMutation, RemoveTagMutationVariables>) {
      return ApolloReactHooks.useMutation<RemoveTagMutation, RemoveTagMutationVariables>(RemoveTagDocument, baseOptions);
    }
export type RemoveTagMutationHookResult = ReturnType<typeof useRemoveTagMutation>;
export type RemoveTagMutationResult = ApolloReactCommon.MutationResult<RemoveTagMutation>;
export type RemoveTagMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTagMutation, RemoveTagMutationVariables>;
export const SetCommentDocument = gql`
    mutation SetComment($providerId: String!, $comment: String!) {
  setComment(providerId: $providerId, comment: $comment)
}
    `;
export type SetCommentMutationFn = ApolloReactCommon.MutationFunction<SetCommentMutation, SetCommentMutationVariables>;

    export function useSetCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetCommentMutation, SetCommentMutationVariables>) {
      return ApolloReactHooks.useMutation<SetCommentMutation, SetCommentMutationVariables>(SetCommentDocument, baseOptions);
    }
export type SetCommentMutationHookResult = ReturnType<typeof useSetCommentMutation>;
export type SetCommentMutationResult = ApolloReactCommon.MutationResult<SetCommentMutation>;
export type SetCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<SetCommentMutation, SetCommentMutationVariables>;
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
    mutation ToggleWantToVisit($providerPlaceId: String!) {
  toggleWantToVisit(providerPlaceId: $providerPlaceId)
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
export const PlaceDetailsDocument = gql`
    query PlaceDetails($providerId: String!) {
  placeDetails(providerId: $providerId) {
    ...PlaceDetails
  }
}
    ${PlaceDetailsFragmentDoc}`;

    export function usePlaceDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
      return ApolloReactHooks.useQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, baseOptions);
    }
      export function usePlaceDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, baseOptions);
      }
      
export type PlaceDetailsQueryHookResult = ReturnType<typeof usePlaceDetailsQuery>;
export type PlaceDetailsQueryResult = ApolloReactCommon.QueryResult<PlaceDetailsQuery, PlaceDetailsQueryVariables>;
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
export const SearchPlaceDocument = gql`
    query SearchPlace($query: String!, $position: PositionInput) {
  searchPlace(query: $query, position: $position) {
    places {
      ...PlaceDetailsBasic
    }
  }
}
    ${PlaceDetailsBasicFragmentDoc}`;

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
export const WantToVisitListDocument = gql`
    query WantToVisitList {
  wantToVisitList {
    ...PlaceDetailsBasic
  }
}
    ${PlaceDetailsBasicFragmentDoc}`;

    export function useWantToVisitListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WantToVisitListQuery, WantToVisitListQueryVariables>) {
      return ApolloReactHooks.useQuery<WantToVisitListQuery, WantToVisitListQueryVariables>(WantToVisitListDocument, baseOptions);
    }
      export function useWantToVisitListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WantToVisitListQuery, WantToVisitListQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<WantToVisitListQuery, WantToVisitListQueryVariables>(WantToVisitListDocument, baseOptions);
      }
      
export type WantToVisitListQueryHookResult = ReturnType<typeof useWantToVisitListQuery>;
export type WantToVisitListQueryResult = ApolloReactCommon.QueryResult<WantToVisitListQuery, WantToVisitListQueryVariables>;