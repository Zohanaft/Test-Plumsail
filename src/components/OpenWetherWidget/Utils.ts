export const getImageUrlByCode = (code: string, scale = 1): string => {
  return `http://openweathermap.org/img/wn/${code}.png`;
};

export const kelvinToCelsiy = (kelvin: number): number => {
  return Math.ceil(kelvin * 100 - 27316) / 100;
};

export const degToCompass = (deg: number): string => {
  const degreese: string = (deg / 22.5).toFixed(0);
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return directions[Number(degreese) % 16];
};

export const getDewPoint = (temp: number, humidity: number): number => {
  const celsiyTemp = kelvinToCelsiy(temp);
  return Math.ceil(
    (17.27 * celsiyTemp) / ((237.7 + celsiyTemp) / Math.log(humidity)),
  );
};

export interface Callback<T1, T2 = void> {
  (param: T1): T2;
}
