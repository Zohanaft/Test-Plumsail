import { City } from './City';
import { DefaultCity } from './CurrentLocation';

export class ApiOpenWether {
  private url: string;
  private cities: Array<City> = [];
  private apiKey: string;
  private dateNow: Date = new Date();

  constructor() {
    this.url = 'https://api.openweathermap.org/data/2.5/forecast';
    this.apiKey = '';
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
    const newCities = this.cities.find(
      (current: City): boolean => city.name === current.name,
    );
    return !!newCities;
  }

  public appendCity(city: City) {
    const isCityExists = this.checkCitiesExistence(city);
    if (isCityExists) return;
    this.cities.push(city);
  }

  async init() {
    if (this.isEmptyCities()) {
      const defaultCity = await new DefaultCity().getCity();
      console.log(defaultCity);
    }
  }
}
