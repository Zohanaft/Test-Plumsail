import { City, CityWether } from './City';
import { DefaultCity } from './CurrentLocation';
import { Callback } from './Utils';

export class ApiOpenWether {
  private url: string;
  private cities: Array<City> = [];
  private citiesWether: Array<CityWether> = [];
  private apiKey: string;
  private timeZoneOffset: number = new Date().getTimezoneOffset();
  private dateNow: Date = new Date();

  constructor() {
    this.url = 'https://api.openweathermap.org/data/2.5/forecast';
    this.apiKey = process.env.OPENWETHER_API_KEY;
    this.cities = JSON.parse(localStorage.getItem('cities'));
    if (this.cities) {
      console.log('cities was found in storage');
    } else {
      this.cities = [];
    }
  }

  protected isEmptyCities() {
    return !!!this.cities.length;
  }

  public checkCitiesExistence(city: City) {
    return !!this.cities.find(
      (current: City): boolean => city.name === current.name,
    );
  }

  public indexOfCity(city: City) {
    const cityIndex = this.cities.findIndex(
      (current: City): boolean => city.name === current.name,
    );
    return cityIndex;
  }

  public appendCity(city: City, callback: Callback<City> = undefined) {
    const indexOfCity = this.indexOfCity(city);
    if (!!(indexOfCity + 1)) return this.cities.splice(indexOfCity, 1, city);
    else this.cities.push(city);
    callback(city);
  }

  async loadFirstly(): Promise<Array<City>> {
    const defaultCity = await new DefaultCity().getCity();
    this.cities.push(defaultCity);
    return this.cities;
  }

  async loadCityWether(city: City): Promise<CityWether> {
    const params = {
      q: city.name,
      appid: this.apiKey,
    };

    let url: URL | string = new URL(this.url);
    url.search = new URLSearchParams(params).toString();
    url = url.toString();

    const response: Response = await fetch(url as string);
    const cityWether: CityWether = await response.json();

    if (response.ok) return cityWether;

    throw new Error('Failed to load wether');
  }

  getCityWether(city: City): CityWether | undefined {
    return this.citiesWether.find(
      (cityWether) => cityWether.city.name === city.name,
    );
  }

  async init() {
    if (this.isEmptyCities()) {
      await this.loadFirstly();
    }
    await Promise.all(
      this.cities.map(async (city) => {
        try {
          const response: CityWether = await this.loadCityWether(city);
          this.citiesWether.push(response);
          this.appendCity(response.city);
        } catch (error) {
          console.error(error.message);
        }
      }),
    );
  }

  getCities(): Array<City> {
    return this.cities;
  }
}
