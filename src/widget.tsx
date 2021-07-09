import React, { useState } from 'react';
import { render } from 'react-dom';
import MaterialIcon from 'material-icons-react';

import { ApiOpenWether } from '@components/OpenWetherWidget/ApiOpenWether';
import { City, CityWether } from '@components/OpenWetherWidget/City';
import { CityWetherWidget } from '@components/OpenWetherWidget/CityWetherWidget';
import { SettingsCityWetherWidget } from '@components/OpenWetherWidget/SettingsCityWetherWidget';

import * as styles from 'src/assets/scss/widget.scss';
import * as mainStyles from 'src/assets/scss/main.scss';

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
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [lockCount, setLockCount] = useState<number>(1);

  const lock = JSON.parse(localStorage.getItem('settings-llock'));

  const lockToggle = () => {
    setLockCount(lockCount - 1);
    console.log(lockCount);
    if (!lockCount) {
      localStorage.setItem('settings-llock', JSON.stringify(false));
    }
  };

  const clickToggle = () => {
    setShowSettings(!showSettings);
  };

  const settingsTogglersLogick = () => {
    clickToggle();
    lockToggle();
  };

  const appendCity = async (city: City) => {
    await wetherWorker.loadCityWether(city);
    setCities([...wetherWorker.cities]);
    setWetherObjects([...wetherWorker.citiesWether]);
  };

  const deleteCity = (city: City) => {
    wetherWorker.removeCity(city);
    setCities([...wetherWorker.cities]);
    setWetherObjects([...wetherWorker.citiesWether]);
  };

  return (
    <div
      className={[
        styles.default['widget-max-width'],
        styles.default['widget-wrapper'],
        mainStyles.default.relative,
      ].join(' ')}
    >
      <button
        className={[
          mainStyles.default.absolute,
          styles.default['widget-settings'],
          `${lock ? '' : styles.default.hidden}`,
        ].join(' ')}
        onClick={settingsTogglersLogick}
      >
        <MaterialIcon icon="settings" color="gray" size="small" />
      </button>
      <SettingsCityWetherWidget
        // Очень интересно как сделать нормальный тогглер для react
        className={`${showSettings ? '' : styles.default.hidden}`}
        cities={cities}
        onAppend={appendCity}
        onDelete={deleteCity}
      />
      {wetherObjects.map((wetherObject, index) => {
        return <CityWetherWidget key={index} wetherObject={wetherObject} />;
      })}
    </div>
  );
};
