import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IData} from "../interface/idata";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private readonly request : HttpClient) {}

  apiKey = "&appid=e0d205557e828d92fd63cceb03ae392f"
  api = 'https://api.openweathermap.org/data/2.5/weather?q='

  getWeatherData(city : string) : Observable<IData>{
    return this.request.get<IData>(this.api + city + this.apiKey)
  }
}
