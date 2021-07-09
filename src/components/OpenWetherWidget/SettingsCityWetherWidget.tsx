import MaterialIcon from 'material-icons-react';
import { City } from './City';

import * as styles from 'src/assets/scss/widget.scss';
import * as mainStyles from 'src/assets/scss/main.scss';
import React from 'react';

interface Properties {
  onAppend(city: City): void;
  cities: Array<City>;
}

export const SettingsCityWetherWidget: React.FC<Properties> = (props) => {
  const cities: Array<City> = props.cities;
  const editCity: City = { name: '' };

  const updateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    editCity.name = event.target.value;
  };

  const appendCity = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') props.onAppend(editCity);
  };

  return (
    <div
      className={[
        styles.default['widget-max-width'],
        styles.default['widget-wrapper'],
      ].join(' ')}
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
              ].join(' ')}
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
