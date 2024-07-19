export interface Location {
  favorite: boolean;
  id: number
  name: string
  lat: number
  lon: number
  country: string
  state: string
}

export interface WeatherLocation {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: string
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

export interface Coord {
  lon: number
  lat: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}

export interface Clouds {
  all: number
}

export interface Sys {
  country: string
  sunrise: number
  sunset: number
}

export interface Forecast {
  cod: string
  message: number
  cnt: number
  list: ForecastList[]
  city: City
}

export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface ForecastList {
  dt: string
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  rain: any
  sys: Sys
  dt_txt: string
}
