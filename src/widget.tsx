import React from 'react';
import { render } from 'react-dom';
import { ApiOpenWether } from '@components/OpenWetherWidget/ApiOpenWether';
import { City } from '@components/OpenWetherWidget/City';
import { CityWetherWidget } from '@components/OpenWetherWidget/CityWetherWidget';

const ApiOpenWetherWorker: ApiOpenWether = new ApiOpenWether();

const Widget: React.FC<{ cities: Array<City>; wetherWorker: ApiOpenWether }> = (
  props,
) => {
  const cities = props.cities;
  const wetherWorker = props.wetherWorker;

  return (
    <>
      <div className="absolute">
        {cities.map((city, index) => {
          return (
            <CityWetherWidget
              city={city}
              wetherWorker={wetherWorker}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};

document.addEventListener('DOMContentLoaded', async () => {
  await ApiOpenWetherWorker.init();

  const collection = document.getElementsByTagName('weather-widget');

  Array.from(collection).forEach((element: Element) => {
    render(
      <Widget
        cities={ApiOpenWetherWorker.getCities()}
        wetherWorker={ApiOpenWetherWorker}
      />,
      element,
    );
  });
});
