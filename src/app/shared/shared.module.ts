import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from "./components/weather/weather.component";
import {CelsiusPipe} from "../pipe/celcius.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    WeatherComponent,
    CelsiusPipe,
  ],
  exports: [
    WeatherComponent
  ]
})
export class SharedModule {}
