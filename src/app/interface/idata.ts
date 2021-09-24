import {IWeather} from "./iweather";
import {IMain} from "./imain";

export interface IData {
  weather: IWeather[]
  main: IMain
  name: string
}
