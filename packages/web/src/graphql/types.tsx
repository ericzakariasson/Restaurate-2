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
  images: Array<VisitImageInput>,
  isPrivate: Scalars['Boolean'],
  isTakeAway: Scalars['Boolean'],
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
  isPrivate: Scalars['Boolean'],
  isTakeAway: Scalars['Boolean'],
  images: Array<VisitImageInput>,
};

/** Type of image */
export enum ImageType {
  Visit = 'Visit',
  Place = 'Place'
}

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

export type LoginMutationResponse = {
   __typename?: 'LoginMutationResponse',
  success: Scalars['Boolean'],
  messages: Array<Scalars['String']>,
  code: LoginResponseCode,
  user?: Maybe<User>,
};

/** Response code for login resolver */
export enum LoginResponseCode {
  Success = 'Success',
  NotFound = 'NotFound',
  NotConfirmed = 'NotConfirmed'
}

export type Metrics = {
   __typename?: 'Metrics',
  registeredUsers: Scalars['Float'],
  confirmedUsers: Scalars['Float'],
  /** Users with at least one visit */
  activeUsers: Scalars['Float'],
};

export type Mutation = {
   __typename?: 'Mutation',
  confirmUser: Scalars['Boolean'],
  login: LoginMutationResponse,
  logout: Scalars['Boolean'],
  sendConfirmationEmail: Scalars['Boolean'],
  register?: Maybe<User>,
  addVisit: VisitResponse,
  editVisit: VisitResponse,
  deleteVisit: Scalars['Boolean'],
  createPlace?: Maybe<Place>,
  toggleWantToVisit: Scalars['Boolean'],
  updatePlace: Place,
  signImagesData: Array<SignImageData>,
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationSendConfirmationEmailArgs = {
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


export type MutationDeleteVisitArgs = {
  id: Scalars['String']
};


export type MutationCreatePlaceArgs = {
  providerId: Scalars['String']
};


export type MutationToggleWantToVisitArgs = {
  providerPlaceId: Scalars['String']
};


export type MutationUpdatePlaceArgs = {
  data: UpdatePlaceInput,
  providerId: Scalars['String']
};


export type MutationSignImagesDataArgs = {
  data: SignImagesInput
};

export type MutationResponse = {
   __typename?: 'MutationResponse',
  success: Scalars['Boolean'],
  messages: Array<Scalars['String']>,
};

export type OpeningHours = {
   __typename?: 'OpeningHours',
  isOpen: Scalars['Boolean'],
};

export type Order = {
   __typename?: 'Order',
  id: Scalars['ID'],
  title: Scalars['String'],
  images: Array<VisitImage>,
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
  hasPlace: Scalars['Boolean'],
  position: Position,
  categories: Array<Scalars['String']>,
};

export type PlacePreview = {
   __typename?: 'PlacePreview',
  placeId?: Maybe<Scalars['ID']>,
};

export type PlaceSearchResult = {
   __typename?: 'PlaceSearchResult',
  places: Array<PlaceDetailsBasic>,
};

/** Type of place */
export enum PlaceType {
  Restaurant = 'Restaurant',
  Cafe = 'Cafe',
  PubBar = 'PubBar',
  FoodTruck = 'FoodTruck'
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
  previewPlace?: Maybe<PlacePreview>,
  wantToVisitList: Array<PlaceDetailsBasic>,
  wantToVisitPlace: Scalars['Boolean'],
  allPlaceTypes: Array<PlaceType>,
  metrics: Metrics,
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
  userId?: Maybe<Scalars['String']>,
  providerId: Scalars['String']
};


export type QueryPreviewPlaceArgs = {
  providerId?: Maybe<Scalars['String']>
};


export type QueryWantToVisitPlaceArgs = {
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

export type SignImageData = {
   __typename?: 'SignImageData',
  apiUrl: Scalars['String'],
  query: Scalars['String'],
};

export type SignImageInput = {
  type: ImageType,
  placeProviderId: Scalars['String'],
  tags: Array<Scalars['String']>,
};

export type SignImagesInput = {
  images: Array<SignImageInput>,
};

export type Tag = {
   __typename?: 'Tag',
  id: Scalars['ID'],
  name: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
};

export type UpdatePlaceInput = {
  comment?: Maybe<Scalars['String']>,
  priceLevel?: Maybe<Scalars['Float']>,
  types?: Maybe<Array<PlaceType>>,
  tags?: Maybe<Array<Scalars['String']>>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  roles: Array<UserRole>,
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

/** User role */
export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export type Visit = {
   __typename?: 'Visit',
  id: Scalars['ID'],
  comment?: Maybe<Scalars['String']>,
  visitDate: Scalars['DateTime'],
  orders: Array<Order>,
  ratings: Array<Rate>,
  images: Array<VisitImage>,
  score: Scalars['Float'],
  private: Scalars['Boolean'],
  takeAway: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  place: Place,
  user: User,
};

export type VisitImage = {
   __typename?: 'VisitImage',
  id: Scalars['ID'],
  placeProviderId: Scalars['String'],
  publicId: Scalars['String'],
  url: Scalars['String'],
  orders: Array<Order>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type VisitImageInput = {
  publicId: Scalars['String'],
  url: Scalars['String'],
  orders: Array<Scalars['String']>,
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
  & Pick<PlaceDetailsBasic, 'providerId' | 'name' | 'address' | 'visits' | 'hasPlace' | 'categories'>
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

export type PlacePreviewFragment = (
  { __typename?: 'PlacePreview' }
  & Pick<PlacePreview, 'placeId'>
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
  & Pick<User, 'id' | 'name' | 'firstName' | 'lastName' | 'roles' | 'email' | 'createdAt' | 'updatedAt' | 'placeCount' | 'visitCount'>
);

export type VisitFragment = (
  { __typename?: 'Visit' }
  & Pick<Visit, 'id' | 'score' | 'comment' | 'visitDate' | 'takeAway' | 'private' | 'createdAt' | 'updatedAt'>
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
  , images: Array<{ __typename?: 'VisitImage' }
    & VisitImageFragment
  >, place: { __typename?: 'Place' }
    & PlaceFragment
   }
);

export type VisitImageFragment = (
  { __typename?: 'VisitImage' }
  & Pick<VisitImage, 'id' | 'url' | 'publicId'>
  & { orders: Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'title'>
  )> }
);

export type VisitOrderFragment = (
  { __typename?: 'Order' }
  & Pick<Order, 'id' | 'title' | 'createdAt' | 'updatedAt'>
);

export type VisitRateFragment = (
  { __typename?: 'Rate' }
  & Pick<Rate, 'id' | 'name' | 'score' | 'calculatedScore' | 'createdAt' | 'updatedAt'>
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

export type ConfirmUserMutationVariables = {
  token: Scalars['String']
};


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type CreatePlaceMutationVariables = {
  providerId: Scalars['String']
};


export type CreatePlaceMutation = (
  { __typename?: 'Mutation' }
  & { createPlace: Maybe<{ __typename?: 'Place' }
    & PlaceFragment
  > }
);

export type DeleteVisitMutationVariables = {
  id: Scalars['String']
};


export type DeleteVisitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteVisit'>
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
  & { login: (
    { __typename?: 'LoginMutationResponse' }
    & Pick<LoginMutationResponse, 'code' | 'success' | 'messages'>
    & { user: Maybe<{ __typename?: 'User' }
      & UserFragment
    > }
  ) }
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

export type SendConfirmationEmailMutationVariables = {
  email: Scalars['String']
};


export type SendConfirmationEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendConfirmationEmail'>
);

export type SignImagesDataMutationVariables = {
  data: SignImagesInput
};


export type SignImagesDataMutation = (
  { __typename?: 'Mutation' }
  & { signImagesData: Array<(
    { __typename?: 'SignImageData' }
    & Pick<SignImageData, 'apiUrl' | 'query'>
  )> }
);

export type ToggleWantToVisitMutationVariables = {
  providerPlaceId: Scalars['String']
};


export type ToggleWantToVisitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleWantToVisit'>
);

export type UpdatePlaceMutationVariables = {
  providerId: Scalars['String'],
  data: UpdatePlaceInput
};


export type UpdatePlaceMutation = (
  { __typename?: 'Mutation' }
  & { updatePlace: { __typename?: 'Place' }
    & PlaceFragment
   }
);

export type MetricsQueryVariables = {};


export type MetricsQuery = (
  { __typename?: 'Query' }
  & { metrics: (
    { __typename?: 'Metrics' }
    & Pick<Metrics, 'registeredUsers' | 'confirmedUsers' | 'activeUsers'>
  ) }
);

export type AllPlaceTypesQueryVariables = {};


export type AllPlaceTypesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'allPlaceTypes'>
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
  providerId: Scalars['String'],
  userId?: Maybe<Scalars['String']>
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

export type PreviewPlaceQueryVariables = {
  providerId: Scalars['String']
};


export type PreviewPlaceQuery = (
  { __typename?: 'Query' }
  & { previewPlace: Maybe<{ __typename?: 'PlacePreview' }
    & PlacePreviewFragment
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

export type WantToVisitPlaceQueryVariables = {
  providerId: Scalars['String']
};


export type WantToVisitPlaceQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'wantToVisitPlace'>
);
export const PlaceDetailsBasicFragmentDoc = gql`
    fragment PlaceDetailsBasic on PlaceDetailsBasic {
  providerId
  name
  address
  visits
  hasPlace
  position {
    lat
    lng
  }
  categories
}
    `;
export const PlacePreviewFragmentDoc = gql`
    fragment PlacePreview on PlacePreview {
  placeId
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
  roles
  email
  createdAt
  updatedAt
  placeCount
  visitCount
}
    `;
export const VisitImageFragmentDoc = gql`
    fragment VisitImage on VisitImage {
  id
  url
  publicId
  orders {
    id
    title
  }
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
  images {
    ...VisitImage
  }
  comment
  visitDate
  takeAway
  private
  place {
    ...Place
  }
  createdAt
  updatedAt
}
    ${VisitOrderFragmentDoc}
${VisitRateFragmentDoc}
${UserFragmentDoc}
${VisitImageFragmentDoc}
${PlaceFragmentDoc}`;
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
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = ApolloReactCommon.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

    export function useConfirmUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
      return ApolloReactHooks.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions);
    }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = ApolloReactCommon.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const CreatePlaceDocument = gql`
    mutation CreatePlace($providerId: String!) {
  createPlace(providerId: $providerId) {
    ...Place
  }
}
    ${PlaceFragmentDoc}`;
export type CreatePlaceMutationFn = ApolloReactCommon.MutationFunction<CreatePlaceMutation, CreatePlaceMutationVariables>;

    export function useCreatePlaceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePlaceMutation, CreatePlaceMutationVariables>) {
      return ApolloReactHooks.useMutation<CreatePlaceMutation, CreatePlaceMutationVariables>(CreatePlaceDocument, baseOptions);
    }
export type CreatePlaceMutationHookResult = ReturnType<typeof useCreatePlaceMutation>;
export type CreatePlaceMutationResult = ApolloReactCommon.MutationResult<CreatePlaceMutation>;
export type CreatePlaceMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePlaceMutation, CreatePlaceMutationVariables>;
export const DeleteVisitDocument = gql`
    mutation DeleteVisit($id: String!) {
  deleteVisit(id: $id)
}
    `;
export type DeleteVisitMutationFn = ApolloReactCommon.MutationFunction<DeleteVisitMutation, DeleteVisitMutationVariables>;

    export function useDeleteVisitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteVisitMutation, DeleteVisitMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteVisitMutation, DeleteVisitMutationVariables>(DeleteVisitDocument, baseOptions);
    }
export type DeleteVisitMutationHookResult = ReturnType<typeof useDeleteVisitMutation>;
export type DeleteVisitMutationResult = ApolloReactCommon.MutationResult<DeleteVisitMutation>;
export type DeleteVisitMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteVisitMutation, DeleteVisitMutationVariables>;
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
    code
    success
    messages
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
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
export const SendConfirmationEmailDocument = gql`
    mutation SendConfirmationEmail($email: String!) {
  sendConfirmationEmail(email: $email)
}
    `;
export type SendConfirmationEmailMutationFn = ApolloReactCommon.MutationFunction<SendConfirmationEmailMutation, SendConfirmationEmailMutationVariables>;

    export function useSendConfirmationEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendConfirmationEmailMutation, SendConfirmationEmailMutationVariables>) {
      return ApolloReactHooks.useMutation<SendConfirmationEmailMutation, SendConfirmationEmailMutationVariables>(SendConfirmationEmailDocument, baseOptions);
    }
export type SendConfirmationEmailMutationHookResult = ReturnType<typeof useSendConfirmationEmailMutation>;
export type SendConfirmationEmailMutationResult = ApolloReactCommon.MutationResult<SendConfirmationEmailMutation>;
export type SendConfirmationEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<SendConfirmationEmailMutation, SendConfirmationEmailMutationVariables>;
export const SignImagesDataDocument = gql`
    mutation SignImagesData($data: SignImagesInput!) {
  signImagesData(data: $data) {
    apiUrl
    query
  }
}
    `;
export type SignImagesDataMutationFn = ApolloReactCommon.MutationFunction<SignImagesDataMutation, SignImagesDataMutationVariables>;

    export function useSignImagesDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignImagesDataMutation, SignImagesDataMutationVariables>) {
      return ApolloReactHooks.useMutation<SignImagesDataMutation, SignImagesDataMutationVariables>(SignImagesDataDocument, baseOptions);
    }
export type SignImagesDataMutationHookResult = ReturnType<typeof useSignImagesDataMutation>;
export type SignImagesDataMutationResult = ApolloReactCommon.MutationResult<SignImagesDataMutation>;
export type SignImagesDataMutationOptions = ApolloReactCommon.BaseMutationOptions<SignImagesDataMutation, SignImagesDataMutationVariables>;
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
export const UpdatePlaceDocument = gql`
    mutation UpdatePlace($providerId: String!, $data: UpdatePlaceInput!) {
  updatePlace(providerId: $providerId, data: $data) {
    ...Place
  }
}
    ${PlaceFragmentDoc}`;
export type UpdatePlaceMutationFn = ApolloReactCommon.MutationFunction<UpdatePlaceMutation, UpdatePlaceMutationVariables>;

    export function useUpdatePlaceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdatePlaceMutation, UpdatePlaceMutationVariables>(UpdatePlaceDocument, baseOptions);
    }
export type UpdatePlaceMutationHookResult = ReturnType<typeof useUpdatePlaceMutation>;
export type UpdatePlaceMutationResult = ApolloReactCommon.MutationResult<UpdatePlaceMutation>;
export type UpdatePlaceMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>;
export const MetricsDocument = gql`
    query Metrics {
  metrics {
    registeredUsers
    confirmedUsers
    activeUsers
  }
}
    `;

    export function useMetricsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MetricsQuery, MetricsQueryVariables>) {
      return ApolloReactHooks.useQuery<MetricsQuery, MetricsQueryVariables>(MetricsDocument, baseOptions);
    }
      export function useMetricsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MetricsQuery, MetricsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MetricsQuery, MetricsQueryVariables>(MetricsDocument, baseOptions);
      }
      
export type MetricsQueryHookResult = ReturnType<typeof useMetricsQuery>;
export type MetricsQueryResult = ApolloReactCommon.QueryResult<MetricsQuery, MetricsQueryVariables>;
export const AllPlaceTypesDocument = gql`
    query AllPlaceTypes {
  allPlaceTypes
}
    `;

    export function useAllPlaceTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>) {
      return ApolloReactHooks.useQuery<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>(AllPlaceTypesDocument, baseOptions);
    }
      export function useAllPlaceTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>(AllPlaceTypesDocument, baseOptions);
      }
      
export type AllPlaceTypesQueryHookResult = ReturnType<typeof useAllPlaceTypesQuery>;
export type AllPlaceTypesQueryResult = ApolloReactCommon.QueryResult<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>;
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
    query Place($providerId: String!, $userId: String) {
  place(providerId: $providerId, userId: $userId) {
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
export const PreviewPlaceDocument = gql`
    query PreviewPlace($providerId: String!) {
  previewPlace(providerId: $providerId) {
    ...PlacePreview
  }
}
    ${PlacePreviewFragmentDoc}`;

    export function usePreviewPlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PreviewPlaceQuery, PreviewPlaceQueryVariables>) {
      return ApolloReactHooks.useQuery<PreviewPlaceQuery, PreviewPlaceQueryVariables>(PreviewPlaceDocument, baseOptions);
    }
      export function usePreviewPlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PreviewPlaceQuery, PreviewPlaceQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PreviewPlaceQuery, PreviewPlaceQueryVariables>(PreviewPlaceDocument, baseOptions);
      }
      
export type PreviewPlaceQueryHookResult = ReturnType<typeof usePreviewPlaceQuery>;
export type PreviewPlaceQueryResult = ApolloReactCommon.QueryResult<PreviewPlaceQuery, PreviewPlaceQueryVariables>;
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
export const WantToVisitPlaceDocument = gql`
    query WantToVisitPlace($providerId: String!) {
  wantToVisitPlace(providerId: $providerId)
}
    `;

    export function useWantToVisitPlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>) {
      return ApolloReactHooks.useQuery<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>(WantToVisitPlaceDocument, baseOptions);
    }
      export function useWantToVisitPlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>(WantToVisitPlaceDocument, baseOptions);
      }
      
export type WantToVisitPlaceQueryHookResult = ReturnType<typeof useWantToVisitPlaceQuery>;
export type WantToVisitPlaceQueryResult = ApolloReactCommon.QueryResult<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>;