import React from 'react';
import { render } from 'react-dom';
import { ApiOpenWether } from '@components/OpenWetherWidget/ApiOpenWether';
import { DefaultCity } from '@components/OpenWetherWidget/CurrentLocation';

const ApiOpenWetherWorker: ApiOpenWether = new ApiOpenWether();

const Widget: React.FC<{ name: string }> = (props) => {
  return (
    <>
      <div className="absolute">
        <h2>{props.name}</h2>
      </div>
    </>
  );
};

document.addEventListener('DOMContentLoaded', async () => {
  const defaultCity = new DefaultCity();
  const result = await defaultCity.getCity();
  const name = result.name;
  ApiOpenWetherWorker.init();

  const collection = document.getElementsByTagName('weather-widget');
  Array.from(collection).forEach((element: Element) => {
    render(<Widget name={name} />, element);
  });
});
