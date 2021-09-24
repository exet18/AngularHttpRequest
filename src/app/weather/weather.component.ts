import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../service/weather.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged, filter,
  switchMap, tap,
} from "rxjs/operators";
import {IData} from "../interface/idata";
import {of} from "rxjs";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  requestForm: FormGroup;
  weatherData?: IData
  error: string = ''

  constructor(private readonly http: WeatherService, private formBuilder: FormBuilder) {
    this.requestForm = this.formBuilder.group({
      city: ['', Validators.pattern(/^[a-zA-Z_ ]*$/)]
    })
  }

  ngOnInit(): void {
    this.requestForm.controls.city.valueChanges.pipe(
      filter(value => value !== '' && value !== null),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(city => this.http.getWeatherData(city).pipe(
        catchError(err => {
          return of(err).pipe(
            tap(value => this.error = value.error.message)
          )
        })
      )),
      tap(item => {
        if (item.status) {
          this.weatherData = undefined
        } else {
          this.weatherData = item
        }
      })
    ).subscribe()
  }

  Reset(): void {
    this.requestForm.get('city')?.setValue('')
    this.weatherData = undefined
  }

}
