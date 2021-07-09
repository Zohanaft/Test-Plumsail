import React, { useState } from 'react';
import { render } from 'react-dom';
import { ApiOpenWether } from '@components/OpenWetherWidget/ApiOpenWether';
import { City, CityWether } from '@components/OpenWetherWidget/City';
import { CityWetherWidget } from '@components/OpenWetherWidget/CityWetherWidget';
import { SettingsCityWetherWidget } from '@components/OpenWetherWidget/SettingsCityWetherWidget';

import * as styles from 'src/assets/scss/widget.scss';

document.addEventListener('DOMContentLoaded', async () => {
  const collection = document.getElementsByTagName('weather-widget');

  Array.from(collection).forEach(async (element: Element) => {
    const ApiOpenWetherWorker: ApiOpenWether = new ApiOpenWether();
    await ApiOpenWetherWorker.init();

    render(
      <>
        <Widget wetherWorker={ApiOpenWetherWorker} />
      </>,
      element,
    );
  });
});

interface Properties {
  wetherWorker: ApiOpenWether;
}

const Widget: React.FC<Properties> = (props) => {
  const wetherWorker = props.wetherWorker;

  const [cities, setCities] = useState<Array<City>>([...wetherWorker.cities]);
  const [wetherObjects, setWetherObjects] = useState<Array<CityWether>>([
    ...wetherWorker.citiesWether,
  ]);

  const appendCity = async (city: City) => {
    await wetherWorker.loadCityWether(city);
    setCities([...wetherWorker.cities]);
    setWetherObjects([...wetherWorker.citiesWether]);
    console.log(wetherWorker.citiesWether);
  };

  return (
    <div
      className={[
        styles.default['widget-max-width'],
        styles.default['widget-wrapper'],
      ].join(' ')}
    >
      <SettingsCityWetherWidget cities={cities} onAppend={appendCity} />
      {wetherObjects.map((wetherObject, index) => {
        return <CityWetherWidget key={index} wetherObject={wetherObject} />;
      })}
    </div>
  );
};
