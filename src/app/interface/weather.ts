import {WeatherDetails} from "./weather-details";
import {Main} from "./main";

export interface Weather {
  weather: WeatherDetails[];
  main: Main;
  name: string;
}
