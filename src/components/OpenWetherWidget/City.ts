import { Coordinate } from './Cooordinate';

export interface CityWether {
  cod: string;
  message: number;
  cnt: number;
  list: Array<WetherObject>;
  city: City;
}
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

export interface WetherObject {
  dt: number;
  main: WetherMainData;
  weather: Array<WetherWidgetData>;
  clouds: unknown;
  wind: WetherWind;
  visibility: number;
  pop: number;
  rain: WetherRainContinues;
  sys: unknown;
  dt_txt: string;
}

export interface WetherMainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WetherWidgetData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WetherWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface WetherRainContinues {
  [key: string]: string;
}
