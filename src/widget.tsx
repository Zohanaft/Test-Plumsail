import React from 'react';
import { render } from 'react-dom';
// TODO: декомпозировать этот пи%ц, для начала
const LOCATION_TOKEN = 'b310a1fc968f87';
const OPENWETHER_API_KEY = 'f1bf6716df7da62f6d731995d7f7a82d';

interface Coordinate {
  lat: number;
  lon: number;
}

interface City {
  id?: number;
  name: string;
  coord?: Coordinate;
  country?: string;
  population?: number;
  timezone?: number;
  sunrize?: number;
  sunset?: number;
}

class ApiOpenWether {
  private url: string;
  private cities: Array<City>;
  private apiKey: string;

  constructor(url: string) {
    this.url = url;
    this.apiKey = OPENWETHER_API_KEY;
    this.cities = JSON.parse(localStorage.getItem('cities'));
  }
}

class DefaultCity {
  private url = 'https://ipinfo.io/json?token=';
  private token: string = LOCATION_TOKEN;
  private city: City;

  constructor() {
    const cityInfo = JSON.parse(localStorage.getItem('default_city_info'));
    if (cityInfo) {
      this.city.name = cityInfo;
    }
  }

  async getCity(): Promise<City> {
    if (!this.city) {
      const response = await fetch(`${this.url}${this.token}`);
      if (response.ok) {
        const result = await response.json();
        console.log(response.ok, result);
        return result;
      }
    } else {
      return this.city;
    }
  }
}

const ApiOpenWetherWorker: ApiOpenWether = new ApiOpenWether(
  'https://api.openweathermap.org/data/2.5/forecast',
);

const Widget: React.FC = (name) => {
  return (
    <>
      <div className="absolute">
        <h2>{name}</h2>
      </div>
    </>
  );
};

document.addEventListener('DOMContentLoaded', async () => {
  const defaultCity = new DefaultCity();
  const result = await defaultCity.getCity();
  const name = result.name;

  const collection = document.getElementsByTagName('weather-widget');
  Array.from(collection).forEach((element: Element) => {
    render(<Widget />, element);
  });
});
