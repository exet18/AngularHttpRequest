import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Weather} from "../interface/weather";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private readonly request : HttpClient) {}

  apiKey = "&appid=e0d205557e828d92fd63cceb03ae392f";
  api = 'https://api.openweathermap.org/data/2.5/weather?q=';

  getWeatherData(city : string) : Observable<Weather>{
    return this.request.get<Weather>(this.api + city + this.apiKey);
  }
}
