import React from 'react';
import MaterialIcon from 'material-icons-react';
import { City } from './City';
import { ApiOpenWether } from './ApiOpenWether';

import * as styles from 'src/assets/scss/widget.scss';
import * as mainStyles from 'src/assets/scss/main.scss';

export const SettingsCityWetherWidget: React.FC<{
  wetherWorker: ApiOpenWether;
}> = (properties) => {
  const wetherWorker = properties.wetherWorker;
  const cities = wetherWorker.getCities();
  const editCity: City = { name: '' };

  const updateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    editCity.name = event.target.value;
  };

  const appendCity = async (event: React.KeyboardEvent) => {
    console.log(editCity);
    if (event.key === 'Enter') {
      console.log(editCity);
      const city: City = await JSON.parse(JSON.stringify(Object(editCity)));
      console.log(editCity);
      const cityWether = await wetherWorker.loadCityWether(city);
      if (cityWether) {
        wetherWorker.appendCity(cityWether.city);
      }
      editCity.name = '';
    }
  };

  return (
    <div
      className={[
        styles.default['widget-max-width'],
        styles.default['widget-wrapper'],
      ]
        .toString()
        .replace(/,/gm, ' ')}
    >
      <span className={mainStyles.default.absolute}>
        <MaterialIcon icon="gear"></MaterialIcon>
      </span>
      <ul>
        {cities.map((city, index) => {
          return (
            <li
              key={index}
              className={[
                mainStyles.default['d-flex'],
                mainStyles.default['align-center'],
              ]
                .toString()
                .replace(/,/gm, ' ')}
            >
              <MaterialIcon icon="burger" size="small" />
              <span>{`${city.name}, ${city.country}`}</span>
              <MaterialIcon icon="delete_outline" size="small" />
            </li>
          );
        })}
      </ul>
      <div className={styles.default['widget-max-width']}>
        <input type="text" onChange={updateCity} onKeyPress={appendCity} />
      </div>
    </div>
  );
};
