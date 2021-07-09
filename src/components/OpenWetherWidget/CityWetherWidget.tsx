import React from 'react';
import MaterialIcon from 'material-icons-react';
import { City, CityWether, WetherObject } from './City';
import {
  degToCompass,
  getDewPoint,
  getImageUrlByCode,
  kelvinToCelsiy,
} from './Utils';

import * as styles from 'src/assets/scss/widget.scss';
import * as mainStyles from 'src/assets/scss/main.scss';

export const CityWetherWidget: React.FC<{
  wetherObject: CityWether;
}> = (properties) => {
  const city: City = properties.wetherObject.city;
  const cityWether: CityWether = properties.wetherObject;
  const wetherObjectList: Array<WetherObject> = cityWether.list;
  // Вытащим таймзон оффсет
  const tz = new Date().getTimezoneOffset() * 60000;
  // Приведем к виду в котором данные прилетают с апи
  const dt = Math.ceil((new Date().getTime() - tz) / 1000);
  // получим погоду без учета таймзон на текущий момент времени в указанном городе
  const currentWetherObject: WetherObject = wetherObjectList.find(
    (item: WetherObject) => {
      return item.dt < dt;
    },
  );
  return (
    <div className={styles.default['widget-wrapper']}>
      <div>
        <span>
          <b>{`${city.name}, ${city.country}`}</b>
        </span>
      </div>
      <div
        className={[
          mainStyles.default['d-flex'],
          mainStyles.default['align-center'],
          styles.default['widget-temperature'],
        ].join(' ')}
      >
        {
          <img
            alt="wether"
            src={getImageUrlByCode(currentWetherObject.weather[0].icon)}
          />
        }
        {kelvinToCelsiy(currentWetherObject.main.temp) + ' C°'}
      </div>
      <div className={[styles.default.row, styles.default['pl-10']].join(' ')}>
        Feels like{' '}
        {kelvinToCelsiy(currentWetherObject.main.feels_like) + ' C° '}
        {currentWetherObject.weather[0].description.trimStart()}
      </div>
      <div className={[styles.default.row].join(' ')}>
        <div
          className={[styles.default['col-6'], styles.default['pl-10']].join(
            ' ',
          )}
        >
          <div
            style={{
              position: 'absolute',
              transformOrigin: 'center',
              transform: `rotate(${currentWetherObject.wind.deg + 'deg'})`,
            }}
          >
            <MaterialIcon icon="navigation" size="small" />
          </div>
          <div style={{ paddingLeft: '30px' }}>
            {currentWetherObject.wind.speed}m/s
            {' ' + degToCompass(currentWetherObject.wind.deg)}
          </div>
        </div>
        <div className={mainStyles.default.relative}>
          <div
            style={{
              position: 'absolute',
              transformOrigin: 'center',
              transform: `rotate(-45deg)`,
            }}
            className={[
              styles.default['col-6'],
              styles.default['pl-10'],
              mainStyles.default['align-center'],
            ].join(' ')}
          >
            <MaterialIcon icon="remove_circle_outline" size="small" />
          </div>
          <div style={{ paddingLeft: '40px' }}>
            {currentWetherObject.main.pressure} hPa
          </div>
        </div>
      </div>

      <div className={styles.default.row}>
        <div
          className={[
            styles.default['col-6'],
            styles.default['pl-10'],
            mainStyles.default['align-center'],
          ].join(' ')}
        >
          <MaterialIcon icon="opacity" size="small"></MaterialIcon>
          Humidity: {currentWetherObject.main.humidity}
        </div>
        <div
          className={[
            styles.default['col-6'],
            styles.default['pl-10'],
            mainStyles.default['align-center'],
          ].join(' ')}
        >
          <MaterialIcon icon="water_drop" size="small"></MaterialIcon>
          Dew point:{' '}
          {getDewPoint(
            currentWetherObject.main.temp,
            currentWetherObject.main.humidity,
          )}{' '}
          C°
        </div>
      </div>

      <div
        className={[
          styles.default.row,
          styles.default['pl-10'],
          mainStyles.default['align-center'],
        ].join(' ')}
      >
        <MaterialIcon icon="visibility" size="small"></MaterialIcon>
        Visibility: {Math.ceil(currentWetherObject.visibility / 100) / 10}km
      </div>
    </div>
  );
};
