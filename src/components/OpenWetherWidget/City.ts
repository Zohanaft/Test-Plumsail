import { Coordinate } from './Cooordinate';

export interface City {
  id?: number;
  name: string;
  coord?: Coordinate;
  country?: string;
  population?: number;
  timezone?: number;
  sunrize?: number;
  sunset?: number;
}
