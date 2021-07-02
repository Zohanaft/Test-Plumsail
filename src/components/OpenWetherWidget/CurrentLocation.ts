import { City } from './City';

export class DefaultCity {
  private url = 'https://ipinfo.io/json?token=';
  private token: string;

  constructor() {
    this.token = process.env.LOCATION_TOKEN;
  }

  async getCity(): Promise<City> {
    const response = await fetch(`${this.url}${this.token}`);
    if (response.ok) {
      const result = await response.json();
      const city: City = {
        name: result.city,
      };
      return city;
    }
    return Promise.resolve(() => ({
      // Хардкод на случай если сервис помрет
      name: 'London',
    }));
  }
}
