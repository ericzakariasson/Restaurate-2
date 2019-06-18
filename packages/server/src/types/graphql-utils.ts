import { Request } from 'express';
import { GoogleMapsClient } from '@google/maps';
import { Column, ColumnOptions } from 'typeorm';

export interface Context {
  req: Request;
  client: GoogleMapsClient;
}

export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}
