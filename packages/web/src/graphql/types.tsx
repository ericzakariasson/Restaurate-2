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

export type DateRange = {
   __typename?: 'DateRange',
  from: Scalars['DateTime'],
  to: Scalars['DateTime'],
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

export type FilterTag = {
   __typename?: 'FilterTag',
  id: Scalars['Float'],
  name: Scalars['String'],
  placeCount: Scalars['Float'],
};

export enum ImageType {
  Visit = 'Visit',
  Place = 'Place',
  VisitDev = 'VisitDev',
  PlaceDev = 'PlaceDev'
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

export enum LoginResponseCode {
  Success = 'Success',
  NotFound = 'NotFound',
  NotConfirmed = 'NotConfirmed'
}

export type Metrics = {
   __typename?: 'Metrics',
  registeredUsers: Scalars['Float'],
  confirmedUsers: Scalars['Float'],
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
  addTag: Tag,
  removeTag: Place,
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
  placeId: Scalars['Int']
};


export type MutationAddTagArgs = {
  name: Scalars['String'],
  placeId: Scalars['Int']
};


export type MutationRemoveTagArgs = {
  placeId: Scalars['Int'],
  id: Scalars['Int']
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

export type PageInfo = {
   __typename?: 'PageInfo',
  page: Scalars['Int'],
  limit: Scalars['Int'],
  hasNextPage: Scalars['Boolean'],
};

export type PageOptions = {
  page?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
};

export type PaginatedPlaceResponse = {
   __typename?: 'PaginatedPlaceResponse',
  data: Array<Place>,
  pageInfo: PageInfo,
};

export type PaginatedUserResponse = {
   __typename?: 'PaginatedUserResponse',
  data: Array<User>,
  pageInfo: PageInfo,
};

export type PaginatedVisitResponse = {
   __typename?: 'PaginatedVisitResponse',
  data: Array<Visit>,
  pageInfo: PageInfo,
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
  averageScore?: Maybe<Scalars['Float']>,
  details?: Maybe<PlaceDetails>,
  hasVisited: Scalars['Boolean'],
  wantToVisit: Scalars['Boolean'],
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

export type PlaceFilterOptions = {
   __typename?: 'PlaceFilterOptions',
  tags: Array<FilterTag>,
  dateRange: DateRange,
};

export type PlacePreview = {
   __typename?: 'PlacePreview',
  placeId?: Maybe<Scalars['ID']>,
};

export type PlaceSearchResult = {
   __typename?: 'PlaceSearchResult',
  places: Array<PlaceDetailsBasic>,
};

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
  searchUsers: PaginatedUserResponse,
  visit?: Maybe<Visit>,
  visits: PaginatedVisitResponse,
  searchPlace: PlaceSearchResult,
  placeDetails: PlaceDetails,
  place?: Maybe<Place>,
  previewPlace?: Maybe<PlacePreview>,
  wantToVisitList: Array<PlaceDetailsBasic>,
  placesWantToVisit: Array<PlaceDetailsBasic>,
  wantToVisitPlace: Scalars['Boolean'],
  allPlaceTypes: Array<PlaceType>,
  placeFilterOptions: PlaceFilterOptions,
  places: PaginatedPlaceResponse,
  searchTag: Array<Tag>,
  metrics: Metrics,
};


export type QuerySearchUsersArgs = {
  options: PageOptions,
  term: Scalars['String']
};


export type QueryVisitArgs = {
  id: Scalars['String']
};


export type QueryVisitsArgs = {
  options: PageOptions
};


export type QuerySearchPlaceArgs = {
  position?: Maybe<PositionInput>,
  query: Scalars['String']
};


export type QueryPlaceDetailsArgs = {
  providerId: Scalars['String']
};


export type QueryPlaceArgs = {
  providerId?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['String']>
};


export type QueryPreviewPlaceArgs = {
  providerId?: Maybe<Scalars['String']>
};


export type QueryWantToVisitPlaceArgs = {
  providerId: Scalars['String']
};


export type QueryPlacesArgs = {
  options: PageOptions
};


export type QuerySearchTagArgs = {
  ignoreIds: Array<Scalars['Int']>,
  term: Scalars['String']
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
  confirmed: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  placeCount: Scalars['Float'],
  visitCount: Scalars['Float'],
};

export type UserRegisterInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export type Visit = {
   __typename?: 'Visit',
  id: Scalars['ID'],
  comment?: Maybe<Scalars['String']>,
  visitDate: Scalars['DateTime'],
  ratings: Array<Rate>,
  images: Array<VisitImage>,
  score: Scalars['Float'],
  private: Scalars['Boolean'],
  takeAway: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  place: Place,
  user: User,
  orders: Array<Order>,
};

export type VisitImage = {
   __typename?: 'VisitImage',
  id: Scalars['ID'],
  placeProviderId: Scalars['String'],
  publicId: Scalars['String'],
  url: Scalars['String'],
  orders?: Maybe<Array<Order>>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type VisitImageInput = {
  id?: Maybe<Scalars['Float']>,
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

export type PageInfoFragment = (
  { __typename?: 'PageInfo' }
  & Pick<PageInfo, 'page' | 'limit' | 'hasNextPage'>
);

export type PlaceDetailsFragment = (
  { __typename?: 'PlaceDetails' }
  & Pick<PlaceDetails, 'providerId' | 'name'>
  & { location: (
    { __typename?: 'Location' }
    & LocationFragment
  ), categories: Array<(
    { __typename?: 'Category' }
    & CategoryFragment
  )>, contact: (
    { __typename?: 'Contact' }
    & ContactFragment
  ), openingHours: Maybe<(
    { __typename?: 'OpeningHours' }
    & OpeningHoursFragment
  )> }
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
  & { tags: Array<(
    { __typename?: 'Tag' }
    & TagFragment
  )>, details: Maybe<(
    { __typename?: 'PlaceDetails' }
    & PlaceDetailsFragment
  )>, user: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type PlacePreviewFragment = (
  { __typename?: 'PlacePreview' }
  & Pick<PlacePreview, 'placeId'>
);

export type TagFragment = (
  { __typename?: 'Tag' }
  & Pick<Tag, 'id' | 'name' | 'createdAt' | 'updatedAt'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'firstName' | 'lastName' | 'roles' | 'confirmed' | 'email' | 'createdAt' | 'updatedAt' | 'placeCount' | 'visitCount'>
);

export type VisitFragment = (
  { __typename?: 'Visit' }
  & Pick<Visit, 'id' | 'score' | 'comment' | 'visitDate' | 'takeAway' | 'private' | 'createdAt' | 'updatedAt'>
  & { orders: Array<(
    { __typename?: 'Order' }
    & VisitOrderFragment
  )>, ratings: Array<(
    { __typename?: 'Rate' }
    & { children: Maybe<Array<(
      { __typename?: 'Rate' }
      & VisitRateFragment
    )>> }
    & VisitRateFragment
  )>, user: (
    { __typename?: 'User' }
    & UserFragment
  ), images: Array<(
    { __typename?: 'VisitImage' }
    & VisitImageFragment
  )>, place: (
    { __typename?: 'Place' }
    & PlaceFragment
  ) }
);

export type VisitImageFragment = (
  { __typename?: 'VisitImage' }
  & Pick<VisitImage, 'id' | 'url' | 'publicId'>
  & { orders: Maybe<Array<(
    { __typename?: 'Order' }
    & Pick<Order, 'id' | 'title'>
  )>> }
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
  placeId: Scalars['Int'],
  name: Scalars['String']
};


export type AddTagMutation = (
  { __typename?: 'Mutation' }
  & { addTag: (
    { __typename?: 'Tag' }
    & TagFragment
  ) }
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
  & { createPlace: Maybe<(
    { __typename?: 'Place' }
    & PlaceFragment
  )> }
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
    & { user: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
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

export type RemoveTagMutationVariables = {
  placeId: Scalars['Int'],
  id: Scalars['Int']
};


export type RemoveTagMutation = (
  { __typename?: 'Mutation' }
  & { removeTag: (
    { __typename?: 'Place' }
    & PlaceFragment
  ) }
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
  placeId: Scalars['Int'],
  data: UpdatePlaceInput
};


export type UpdatePlaceMutation = (
  { __typename?: 'Mutation' }
  & { updatePlace: (
    { __typename?: 'Place' }
    & PlaceFragment
  ) }
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
  & { me: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type MePlacesQueryVariables = {
  page: Scalars['Int'],
  limit?: Maybe<Scalars['Int']>
};


export type MePlacesQuery = (
  { __typename?: 'Query' }
  & { places: (
    { __typename?: 'PaginatedPlaceResponse' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), data: Array<(
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'providerId' | 'averageScore' | 'visitCount'>
      & { details: Maybe<(
        { __typename?: 'PlaceDetails' }
        & Pick<PlaceDetails, 'name'>
        & { location: (
          { __typename?: 'Location' }
          & { address: (
            { __typename?: 'Address' }
            & Pick<Address, 'formatted'>
          ) }
        ) }
      )>, tags: Array<(
        { __typename?: 'Tag' }
        & TagFragment
      )> }
    )> }
  ) }
);

export type MeVisitsQueryVariables = {
  page: Scalars['Int'],
  limit?: Maybe<Scalars['Int']>
};


export type MeVisitsQuery = (
  { __typename?: 'Query' }
  & { visits: (
    { __typename?: 'PaginatedVisitResponse' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), data: Array<(
      { __typename?: 'Visit' }
      & Pick<Visit, 'id' | 'score' | 'visitDate' | 'comment' | 'createdAt' | 'updatedAt'>
      & { orders: Array<(
        { __typename?: 'Order' }
        & VisitOrderFragment
      )>, images: Array<(
        { __typename?: 'VisitImage' }
        & Pick<VisitImage, 'id'>
      )>, place: (
        { __typename?: 'Place' }
        & Pick<Place, 'id' | 'providerId'>
        & { details: Maybe<(
          { __typename?: 'PlaceDetails' }
          & Pick<PlaceDetails, 'providerId' | 'name'>
          & { location: (
            { __typename?: 'Location' }
            & { address: (
              { __typename?: 'Address' }
              & Pick<Address, 'formatted'>
            ) }
          ) }
        )> }
      ) }
    )> }
  ) }
);

export type PlaceDetailsQueryVariables = {
  providerId: Scalars['String']
};


export type PlaceDetailsQuery = (
  { __typename?: 'Query' }
  & { placeDetails: (
    { __typename?: 'PlaceDetails' }
    & PlaceDetailsFragment
  ) }
);

export type PlaceQueryVariables = {
  id?: Maybe<Scalars['String']>,
  providerId?: Maybe<Scalars['String']>
};


export type PlaceQuery = (
  { __typename?: 'Query' }
  & { place: Maybe<(
    { __typename?: 'Place' }
    & { visits: Array<(
      { __typename?: 'Visit' }
      & VisitFragment
    )> }
    & PlaceFragment
  )> }
);

export type PreviewPlaceQueryVariables = {
  providerId: Scalars['String']
};


export type PreviewPlaceQuery = (
  { __typename?: 'Query' }
  & { previewPlace: Maybe<(
    { __typename?: 'PlacePreview' }
    & PlacePreviewFragment
  )> }
);

export type SearchPlaceQueryVariables = {
  query: Scalars['String'],
  position?: Maybe<PositionInput>
};


export type SearchPlaceQuery = (
  { __typename?: 'Query' }
  & { searchPlace: (
    { __typename?: 'PlaceSearchResult' }
    & { places: Array<(
      { __typename?: 'PlaceDetailsBasic' }
      & PlaceDetailsBasicFragment
    )> }
  ) }
);

export type SearchTagQueryVariables = {
  term: Scalars['String'],
  ignoreIds: Array<Scalars['Int']>
};


export type SearchTagQuery = (
  { __typename?: 'Query' }
  & { searchTag: Array<(
    { __typename?: 'Tag' }
    & TagFragment
  )> }
);

export type SearchUserQueryVariables = {
  term: Scalars['String'],
  options: PageOptions
};


export type SearchUserQuery = (
  { __typename?: 'Query' }
  & { searchUsers: (
    { __typename?: 'PaginatedUserResponse' }
    & { data: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'visitCount' | 'placeCount'>
    )> }
  ) }
);

export type VisitQueryVariables = {
  id: Scalars['String']
};


export type VisitQuery = (
  { __typename?: 'Query' }
  & { visit: Maybe<(
    { __typename?: 'Visit' }
    & VisitFragment
  )> }
);

export type WantToVisitListQueryVariables = {};


export type WantToVisitListQuery = (
  { __typename?: 'Query' }
  & { wantToVisitList: Array<(
    { __typename?: 'PlaceDetailsBasic' }
    & PlaceDetailsBasicFragment
  )> }
);

export type WantToVisitPlaceQueryVariables = {
  providerId: Scalars['String']
};


export type WantToVisitPlaceQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'wantToVisitPlace'>
);

export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  page
  limit
  hasNextPage
}
    `;
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
  confirmed
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
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  id
  name
  createdAt
  updatedAt
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
    ...Tag
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
    ${TagFragmentDoc}
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
export const AddTagDocument = gql`
    mutation AddTag($placeId: Int!, $name: String!) {
  addTag(placeId: $placeId, name: $name) {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export type AddTagMutationFn = ApolloReactCommon.MutationFunction<AddTagMutation, AddTagMutationVariables>;

/**
 * __useAddTagMutation__
 *
 * To run a mutation, you first call `useAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagMutation, { data, loading, error }] = useAddTagMutation({
 *   variables: {
 *      placeId: // value for 'placeId'
 *      name: // value for 'name'
 *   },
 * });
 */
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

/**
 * __useAddVisitMutation__
 *
 * To run a mutation, you first call `useAddVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVisitMutation, { data, loading, error }] = useAddVisitMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
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

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
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

/**
 * __useCreatePlaceMutation__
 *
 * To run a mutation, you first call `useCreatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaceMutation, { data, loading, error }] = useCreatePlaceMutation({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
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

/**
 * __useDeleteVisitMutation__
 *
 * To run a mutation, you first call `useDeleteVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVisitMutation, { data, loading, error }] = useDeleteVisitMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
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

/**
 * __useEditVisitMutation__
 *
 * To run a mutation, you first call `useEditVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editVisitMutation, { data, loading, error }] = useEditVisitMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
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

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
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

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
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

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveTagDocument = gql`
    mutation RemoveTag($placeId: Int!, $id: Int!) {
  removeTag(placeId: $placeId, id: $id) {
    ...Place
  }
}
    ${PlaceFragmentDoc}`;
export type RemoveTagMutationFn = ApolloReactCommon.MutationFunction<RemoveTagMutation, RemoveTagMutationVariables>;

/**
 * __useRemoveTagMutation__
 *
 * To run a mutation, you first call `useRemoveTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagMutation, { data, loading, error }] = useRemoveTagMutation({
 *   variables: {
 *      placeId: // value for 'placeId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveTagMutation, RemoveTagMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveTagMutation, RemoveTagMutationVariables>(RemoveTagDocument, baseOptions);
      }
export type RemoveTagMutationHookResult = ReturnType<typeof useRemoveTagMutation>;
export type RemoveTagMutationResult = ApolloReactCommon.MutationResult<RemoveTagMutation>;
export type RemoveTagMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveTagMutation, RemoveTagMutationVariables>;
export const SendConfirmationEmailDocument = gql`
    mutation SendConfirmationEmail($email: String!) {
  sendConfirmationEmail(email: $email)
}
    `;
export type SendConfirmationEmailMutationFn = ApolloReactCommon.MutationFunction<SendConfirmationEmailMutation, SendConfirmationEmailMutationVariables>;

/**
 * __useSendConfirmationEmailMutation__
 *
 * To run a mutation, you first call `useSendConfirmationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendConfirmationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendConfirmationEmailMutation, { data, loading, error }] = useSendConfirmationEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
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

/**
 * __useSignImagesDataMutation__
 *
 * To run a mutation, you first call `useSignImagesDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignImagesDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signImagesDataMutation, { data, loading, error }] = useSignImagesDataMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
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

/**
 * __useToggleWantToVisitMutation__
 *
 * To run a mutation, you first call `useToggleWantToVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleWantToVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleWantToVisitMutation, { data, loading, error }] = useToggleWantToVisitMutation({
 *   variables: {
 *      providerPlaceId: // value for 'providerPlaceId'
 *   },
 * });
 */
export function useToggleWantToVisitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleWantToVisitMutation, ToggleWantToVisitMutationVariables>) {
        return ApolloReactHooks.useMutation<ToggleWantToVisitMutation, ToggleWantToVisitMutationVariables>(ToggleWantToVisitDocument, baseOptions);
      }
export type ToggleWantToVisitMutationHookResult = ReturnType<typeof useToggleWantToVisitMutation>;
export type ToggleWantToVisitMutationResult = ApolloReactCommon.MutationResult<ToggleWantToVisitMutation>;
export type ToggleWantToVisitMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleWantToVisitMutation, ToggleWantToVisitMutationVariables>;
export const UpdatePlaceDocument = gql`
    mutation UpdatePlace($placeId: Int!, $data: UpdatePlaceInput!) {
  updatePlace(placeId: $placeId, data: $data) {
    ...Place
  }
}
    ${PlaceFragmentDoc}`;
export type UpdatePlaceMutationFn = ApolloReactCommon.MutationFunction<UpdatePlaceMutation, UpdatePlaceMutationVariables>;

/**
 * __useUpdatePlaceMutation__
 *
 * To run a mutation, you first call `useUpdatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlaceMutation, { data, loading, error }] = useUpdatePlaceMutation({
 *   variables: {
 *      placeId: // value for 'placeId'
 *      data: // value for 'data'
 *   },
 * });
 */
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

/**
 * __useMetricsQuery__
 *
 * To run a query within a React component, call `useMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetricsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMetricsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MetricsQuery, MetricsQueryVariables>) {
        return ApolloReactHooks.useQuery<MetricsQuery, MetricsQueryVariables>(MetricsDocument, baseOptions);
      }
export function useMetricsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MetricsQuery, MetricsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MetricsQuery, MetricsQueryVariables>(MetricsDocument, baseOptions);
        }
export type MetricsQueryHookResult = ReturnType<typeof useMetricsQuery>;
export type MetricsLazyQueryHookResult = ReturnType<typeof useMetricsLazyQuery>;
export type MetricsQueryResult = ApolloReactCommon.QueryResult<MetricsQuery, MetricsQueryVariables>;
export const AllPlaceTypesDocument = gql`
    query AllPlaceTypes {
  allPlaceTypes
}
    `;

/**
 * __useAllPlaceTypesQuery__
 *
 * To run a query within a React component, call `useAllPlaceTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPlaceTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPlaceTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPlaceTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>) {
        return ApolloReactHooks.useQuery<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>(AllPlaceTypesDocument, baseOptions);
      }
export function useAllPlaceTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>(AllPlaceTypesDocument, baseOptions);
        }
export type AllPlaceTypesQueryHookResult = ReturnType<typeof useAllPlaceTypesQuery>;
export type AllPlaceTypesLazyQueryHookResult = ReturnType<typeof useAllPlaceTypesLazyQuery>;
export type AllPlaceTypesQueryResult = ApolloReactCommon.QueryResult<AllPlaceTypesQuery, AllPlaceTypesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const MePlacesDocument = gql`
    query MePlaces($page: Int!, $limit: Int) {
  places(options: {page: $page, limit: $limit}) {
    pageInfo {
      ...PageInfo
    }
    data {
      id
      providerId
      details {
        name
        location {
          address {
            formatted
          }
        }
      }
      averageScore
      visitCount
      tags {
        ...Tag
      }
    }
  }
}
    ${PageInfoFragmentDoc}
${TagFragmentDoc}`;

/**
 * __useMePlacesQuery__
 *
 * To run a query within a React component, call `useMePlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMePlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMePlacesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMePlacesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MePlacesQuery, MePlacesQueryVariables>) {
        return ApolloReactHooks.useQuery<MePlacesQuery, MePlacesQueryVariables>(MePlacesDocument, baseOptions);
      }
export function useMePlacesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MePlacesQuery, MePlacesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MePlacesQuery, MePlacesQueryVariables>(MePlacesDocument, baseOptions);
        }
export type MePlacesQueryHookResult = ReturnType<typeof useMePlacesQuery>;
export type MePlacesLazyQueryHookResult = ReturnType<typeof useMePlacesLazyQuery>;
export type MePlacesQueryResult = ApolloReactCommon.QueryResult<MePlacesQuery, MePlacesQueryVariables>;
export const MeVisitsDocument = gql`
    query MeVisits($page: Int!, $limit: Int) {
  visits(options: {page: $page, limit: $limit}) {
    pageInfo {
      ...PageInfo
    }
    data {
      id
      score
      visitDate
      orders {
        ...VisitOrder
      }
      images {
        id
      }
      comment
      place {
        id
        providerId
        details {
          providerId
          name
          location {
            address {
              formatted
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }
}
    ${PageInfoFragmentDoc}
${VisitOrderFragmentDoc}`;

/**
 * __useMeVisitsQuery__
 *
 * To run a query within a React component, call `useMeVisitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeVisitsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeVisitsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMeVisitsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeVisitsQuery, MeVisitsQueryVariables>) {
        return ApolloReactHooks.useQuery<MeVisitsQuery, MeVisitsQueryVariables>(MeVisitsDocument, baseOptions);
      }
export function useMeVisitsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeVisitsQuery, MeVisitsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeVisitsQuery, MeVisitsQueryVariables>(MeVisitsDocument, baseOptions);
        }
export type MeVisitsQueryHookResult = ReturnType<typeof useMeVisitsQuery>;
export type MeVisitsLazyQueryHookResult = ReturnType<typeof useMeVisitsLazyQuery>;
export type MeVisitsQueryResult = ApolloReactCommon.QueryResult<MeVisitsQuery, MeVisitsQueryVariables>;
export const PlaceDetailsDocument = gql`
    query PlaceDetails($providerId: String!) {
  placeDetails(providerId: $providerId) {
    ...PlaceDetails
  }
}
    ${PlaceDetailsFragmentDoc}`;

/**
 * __usePlaceDetailsQuery__
 *
 * To run a query within a React component, call `usePlaceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceDetailsQuery({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function usePlaceDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, baseOptions);
      }
export function usePlaceDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceDetailsQuery, PlaceDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaceDetailsQuery, PlaceDetailsQueryVariables>(PlaceDetailsDocument, baseOptions);
        }
export type PlaceDetailsQueryHookResult = ReturnType<typeof usePlaceDetailsQuery>;
export type PlaceDetailsLazyQueryHookResult = ReturnType<typeof usePlaceDetailsLazyQuery>;
export type PlaceDetailsQueryResult = ApolloReactCommon.QueryResult<PlaceDetailsQuery, PlaceDetailsQueryVariables>;
export const PlaceDocument = gql`
    query Place($id: String, $providerId: String) {
  place(id: $id, providerId: $providerId) {
    ...Place
    visits {
      ...Visit
    }
  }
}
    ${PlaceFragmentDoc}
${VisitFragmentDoc}`;

/**
 * __usePlaceQuery__
 *
 * To run a query within a React component, call `usePlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function usePlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, baseOptions);
      }
export function usePlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, baseOptions);
        }
export type PlaceQueryHookResult = ReturnType<typeof usePlaceQuery>;
export type PlaceLazyQueryHookResult = ReturnType<typeof usePlaceLazyQuery>;
export type PlaceQueryResult = ApolloReactCommon.QueryResult<PlaceQuery, PlaceQueryVariables>;
export const PreviewPlaceDocument = gql`
    query PreviewPlace($providerId: String!) {
  previewPlace(providerId: $providerId) {
    ...PlacePreview
  }
}
    ${PlacePreviewFragmentDoc}`;

/**
 * __usePreviewPlaceQuery__
 *
 * To run a query within a React component, call `usePreviewPlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewPlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewPlaceQuery({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function usePreviewPlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PreviewPlaceQuery, PreviewPlaceQueryVariables>) {
        return ApolloReactHooks.useQuery<PreviewPlaceQuery, PreviewPlaceQueryVariables>(PreviewPlaceDocument, baseOptions);
      }
export function usePreviewPlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PreviewPlaceQuery, PreviewPlaceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PreviewPlaceQuery, PreviewPlaceQueryVariables>(PreviewPlaceDocument, baseOptions);
        }
export type PreviewPlaceQueryHookResult = ReturnType<typeof usePreviewPlaceQuery>;
export type PreviewPlaceLazyQueryHookResult = ReturnType<typeof usePreviewPlaceLazyQuery>;
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

/**
 * __useSearchPlaceQuery__
 *
 * To run a query within a React component, call `useSearchPlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPlaceQuery({
 *   variables: {
 *      query: // value for 'query'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useSearchPlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchPlaceQuery, SearchPlaceQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchPlaceQuery, SearchPlaceQueryVariables>(SearchPlaceDocument, baseOptions);
      }
export function useSearchPlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchPlaceQuery, SearchPlaceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchPlaceQuery, SearchPlaceQueryVariables>(SearchPlaceDocument, baseOptions);
        }
export type SearchPlaceQueryHookResult = ReturnType<typeof useSearchPlaceQuery>;
export type SearchPlaceLazyQueryHookResult = ReturnType<typeof useSearchPlaceLazyQuery>;
export type SearchPlaceQueryResult = ApolloReactCommon.QueryResult<SearchPlaceQuery, SearchPlaceQueryVariables>;
export const SearchTagDocument = gql`
    query SearchTag($term: String!, $ignoreIds: [Int!]!) {
  searchTag(term: $term, ignoreIds: $ignoreIds) {
    ...Tag
  }
}
    ${TagFragmentDoc}`;

/**
 * __useSearchTagQuery__
 *
 * To run a query within a React component, call `useSearchTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTagQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTagQuery({
 *   variables: {
 *      term: // value for 'term'
 *      ignoreIds: // value for 'ignoreIds'
 *   },
 * });
 */
export function useSearchTagQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchTagQuery, SearchTagQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchTagQuery, SearchTagQueryVariables>(SearchTagDocument, baseOptions);
      }
export function useSearchTagLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchTagQuery, SearchTagQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchTagQuery, SearchTagQueryVariables>(SearchTagDocument, baseOptions);
        }
export type SearchTagQueryHookResult = ReturnType<typeof useSearchTagQuery>;
export type SearchTagLazyQueryHookResult = ReturnType<typeof useSearchTagLazyQuery>;
export type SearchTagQueryResult = ApolloReactCommon.QueryResult<SearchTagQuery, SearchTagQueryVariables>;
export const SearchUserDocument = gql`
    query SearchUser($term: String!, $options: PageOptions!) {
  searchUsers(term: $term, options: $options) {
    data {
      id
      name
      visitCount
      placeCount
    }
  }
}
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      term: // value for 'term'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, baseOptions);
      }
export function useSearchUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, baseOptions);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = ApolloReactCommon.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const VisitDocument = gql`
    query Visit($id: String!) {
  visit(id: $id) {
    ...Visit
  }
}
    ${VisitFragmentDoc}`;

/**
 * __useVisitQuery__
 *
 * To run a query within a React component, call `useVisitQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVisitQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VisitQuery, VisitQueryVariables>) {
        return ApolloReactHooks.useQuery<VisitQuery, VisitQueryVariables>(VisitDocument, baseOptions);
      }
export function useVisitLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VisitQuery, VisitQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VisitQuery, VisitQueryVariables>(VisitDocument, baseOptions);
        }
export type VisitQueryHookResult = ReturnType<typeof useVisitQuery>;
export type VisitLazyQueryHookResult = ReturnType<typeof useVisitLazyQuery>;
export type VisitQueryResult = ApolloReactCommon.QueryResult<VisitQuery, VisitQueryVariables>;
export const WantToVisitListDocument = gql`
    query WantToVisitList {
  wantToVisitList {
    ...PlaceDetailsBasic
  }
}
    ${PlaceDetailsBasicFragmentDoc}`;

/**
 * __useWantToVisitListQuery__
 *
 * To run a query within a React component, call `useWantToVisitListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWantToVisitListQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWantToVisitListQuery({
 *   variables: {
 *   },
 * });
 */
export function useWantToVisitListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WantToVisitListQuery, WantToVisitListQueryVariables>) {
        return ApolloReactHooks.useQuery<WantToVisitListQuery, WantToVisitListQueryVariables>(WantToVisitListDocument, baseOptions);
      }
export function useWantToVisitListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WantToVisitListQuery, WantToVisitListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WantToVisitListQuery, WantToVisitListQueryVariables>(WantToVisitListDocument, baseOptions);
        }
export type WantToVisitListQueryHookResult = ReturnType<typeof useWantToVisitListQuery>;
export type WantToVisitListLazyQueryHookResult = ReturnType<typeof useWantToVisitListLazyQuery>;
export type WantToVisitListQueryResult = ApolloReactCommon.QueryResult<WantToVisitListQuery, WantToVisitListQueryVariables>;
export const WantToVisitPlaceDocument = gql`
    query WantToVisitPlace($providerId: String!) {
  wantToVisitPlace(providerId: $providerId)
}
    `;

/**
 * __useWantToVisitPlaceQuery__
 *
 * To run a query within a React component, call `useWantToVisitPlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useWantToVisitPlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWantToVisitPlaceQuery({
 *   variables: {
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useWantToVisitPlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>) {
        return ApolloReactHooks.useQuery<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>(WantToVisitPlaceDocument, baseOptions);
      }
export function useWantToVisitPlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>(WantToVisitPlaceDocument, baseOptions);
        }
export type WantToVisitPlaceQueryHookResult = ReturnType<typeof useWantToVisitPlaceQuery>;
export type WantToVisitPlaceLazyQueryHookResult = ReturnType<typeof useWantToVisitPlaceLazyQuery>;
export type WantToVisitPlaceQueryResult = ApolloReactCommon.QueryResult<WantToVisitPlaceQuery, WantToVisitPlaceQueryVariables>;