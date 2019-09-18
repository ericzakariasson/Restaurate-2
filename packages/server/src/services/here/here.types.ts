export type Headers = { [key: string]: string };

export interface HereCategory {
  id: string;
  title: string;
  href: string;
  type: string;
  system: string;
}

export interface HereOpeningHours {
  label: string;
  isOpen: boolean;
  text: string;
}

export interface HereSearchResultItem {
  id: string;
  position: number[];
  ditance: number;
  title: string;
  averageRating: number;
  categories: HereCategory[];
  icon: string;
  vicinity: string;
  href: string;
  openingHours: HereOpeningHours;
}

export interface HereSearchResult {
  results: {
    items: HereSearchResultItem[];
  };
}

interface HereAddress {
  text: string;
  house: string;
  street: string;
  postalCode: string;
  district: string;
  city: string;
  county: string;
  state: string;
  country: string;
  countryCode: string;
}

export interface HereLocation {
  position: [number, number];
  address: HereAddress;
}

interface LabelValuePair {
  label: string;
  value: string;
}

export interface HereContacts {
  phone: LabelValuePair[];
  website: LabelValuePair[];
}

interface Tag {
  id: string;
  title: string;
  group: string;
}

export interface HerePlaceDetails {
  name: string;
  placeId: string;
  view: string;
  location: HereLocation;
  contacts: HereContacts;
  categories: HereCategory[];
  tags: Tag[];
  icon: string;
  extended: {
    openingHours: HereOpeningHours;
  };
}
