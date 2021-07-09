import React from 'react';
import { City } from './City';

import MaterialIcon from 'material-icons-react';
import * as mainStyles from 'src/assets/scss/main.scss';
import * as styles from 'src/assets/scss/widget.scss';

interface Properties {
  city: City;
  onDelete(city: City): void;
}

export const CityListItem: React.FC<Properties> = ({ city, onDelete }) => {
  const deleteHandler = () => {
    onDelete(city);
  };

  return (
    <li
      className={[
        mainStyles.default['d-flex'],
        mainStyles.default['align-center'],
      ].join(' ')}
    >
      <MaterialIcon icon="menu" size="small" />
      <span>{`${city.name}, ${city.country}`}</span>
      <button
        className={styles.default['widget-remove-button']}
        onClick={deleteHandler}
      >
        <MaterialIcon icon="delete_outline" size="small" />
      </button>
    </li>
  );
};
