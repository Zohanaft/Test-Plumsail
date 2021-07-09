import MaterialIcon from 'material-icons-react';
import { City } from './City';

import * as styles from 'src/assets/scss/widget.scss';
import * as mainStyles from 'src/assets/scss/main.scss';
import React from 'react';
import { CityListItem } from './CityListItem';

interface Properties {
  onAppend(city: City): void;
  onDelete(city: City): void;
  cities: Array<City>;
  className: string;
}

export const SettingsCityWetherWidget: React.FC<Properties> = ({
  onAppend,
  cities,
  className,
  onDelete,
}) => {
  const editCity: City = { name: '' };

  const updateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    editCity.name = event.target.value;
  };

  const appendCity = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onAppend(editCity);
  };

  const deleteCity = (city: City) => {
    onDelete(city);
  };

  return (
    <div
      className={[
        styles.default['widget-max-width'],
        styles.default['widget-wrapper'],
        className,
      ].join(' ')}
    >
      <span className={mainStyles.default.absolute}>
        <MaterialIcon icon="gear"></MaterialIcon>
      </span>
      <ul>
        {cities.map((city, index) => {
          return <CityListItem key={index} city={city} onDelete={deleteCity} />;
        })}
      </ul>
      <div
        className={[
          styles.default['widget-max-width'],
          styles.default['pr-10'],
          styles.default['pl-10'],
        ].join(' ')}
      >
        <input type="text" onChange={updateCity} onKeyPress={appendCity} />
      </div>
    </div>
  );
};
