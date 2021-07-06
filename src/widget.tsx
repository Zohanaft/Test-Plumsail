import React from 'react';
import { render } from 'react-dom';
import { ApiOpenWether } from '@components/OpenWetherWidget/ApiOpenWether';
import { City } from '@components/OpenWetherWidget/City';
import { CityWetherWidget } from '@components/OpenWetherWidget/CityWetherWidget';
import { SettingsCityWetherWidget } from '@components/OpenWetherWidget/SettingsCityWetherWidget';

import * as styles from 'src/assets/scss/widget.scss';

const ApiOpenWetherWorker: ApiOpenWether = new ApiOpenWether();

const Widget: React.FC<{ cities: Array<City>; wetherWorker: ApiOpenWether }> = (
  props,
) => {
  const cities = props.cities;
  const wetherWorker = props.wetherWorker;

  return (
    <div
      className={[
        styles.default['widget-max-width'],
        styles.default['widget-wrapper'],
      ]
        .toString()
        .replace(/,/gm, ' ')}
    >
      <SettingsCityWetherWidget wetherWorker={wetherWorker} />
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
  );
};

document.addEventListener('DOMContentLoaded', async () => {
  await ApiOpenWetherWorker.init();

  const collection = document.getElementsByTagName('weather-widget');

  Array.from(collection).forEach((element: Element) => {
    render(
      <>
        <Widget
          cities={ApiOpenWetherWorker.getCities()}
          wetherWorker={ApiOpenWetherWorker}
        />
      </>,
      element,
    );
  });
});
