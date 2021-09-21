import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../service/weather.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged, filter,
  retryWhen,
  switchMap,
  tap
} from "rxjs/operators";
import {IData} from "../interface/idata";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  requestForm: FormGroup;
  weatherData?: IData
  requestError : boolean = false
  show : boolean = false
  src?: string

  constructor(private readonly http : WeatherService, private formBuilder : FormBuilder) {
    this.requestForm = this.formBuilder.group({
      city: new FormControl('',[Validators.pattern(/^[a-zA-Z_ ]*$/)])
    })
  }
  ngOnInit(): void {
    const stream$ = this.requestForm.controls.city.valueChanges
    stream$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(city => this.http.getWeatherData(city)),
      retryWhen(errors => errors.pipe(
        filter(err => err.status == 404),
        tap(() =>{
          this.requestError = true
          this.show = false
        })
      ))
    ).subscribe(value => {
      this.weatherData = value
      this.requestError = false
      this.show = true
    })
  }
}
