import { City, CityWether } from './City';
import { DefaultCity } from './CurrentLocation';

export class ApiOpenWether {
  private url: string;
  private apiKey: string;
  public cities: Array<City> = [];
  public citiesWether: Array<CityWether> = [];

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

  public appendCity(city: City) {
    const indexOfCity = this.indexOfCity(city);
    if (!!(indexOfCity + 1)) this.cities.splice(indexOfCity, 1, city);
    else {
      this.cities.push(city);
    }
    this.updateStorage();
  }

  public removeCity(city: City) {
    const indexOfCity = this.indexOfCity(city);
    this.cities.splice(indexOfCity, 1);
    this.removeCityWether(city);
    this.updateStorage();
  }

  public updateStorage() {
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  public removeCityWether(city: City) {
    const indexOfCityWether = this.citiesWether.findIndex(
      (cityWether) => cityWether.city.name === city.name,
    );
    if (indexOfCityWether) this.citiesWether.splice(indexOfCityWether, 1);
  }

  async loadFirstly(): Promise<Array<City>> {
    const defaultCity = await new DefaultCity().getCity();
    this.cities.push(defaultCity);
    return this.cities;
  }

  public async loadCityWether(city: City): Promise<CityWether> {
    const params = {
      q: city.name,
      appid: this.apiKey,
    };

    let url: URL | string = new URL(this.url);
    url.search = new URLSearchParams(params).toString();
    url = url.toString();

    const response: Response = await fetch(url as string);
    const cityWether: CityWether = await response.json();
    this.appendCity(cityWether.city);
    this.citiesWether.push(cityWether);

    if (response.ok) return cityWether;

    throw new Error('Failed to load wether');
  }

  public getCityWether(city: City): CityWether | undefined {
    return this.citiesWether.find(
      (cityWether) => cityWether.city.name === city.name,
    );
  }

  public async init() {
    if (this.isEmptyCities()) {
      await this.loadFirstly();
    }
    await Promise.all(
      this.cities.map(async (city) => {
        try {
          await this.loadCityWether(city);
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
