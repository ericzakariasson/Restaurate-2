import { Request } from 'express';
import { GoogleMapsClient } from '@google/maps';

export interface Context {
  req: Request;
  client: GoogleMapsClient;
}
