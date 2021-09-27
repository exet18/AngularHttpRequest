import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../service/weather.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged, filter,
  switchMap, tap,
} from "rxjs/operators";
import {Weather} from "../interface/weather";
import {of} from "rxjs";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  requestForm: FormGroup;
  weatherData: Weather | undefined
  error: string = ''

  constructor(private readonly http: WeatherService, private formBuilder: FormBuilder) {
    this.requestForm = this.formBuilder.group({
      city: [null, Validators.pattern(/^[a-zA-Z_ ]*$/)]
    })
  }
  get validInput() : boolean {
    return this.requestForm.controls.city.invalid && this.requestForm.controls.city.touched;
  }
  get onlyLetter() : boolean {
    return this.requestForm.controls.city.errors && this.requestForm.controls.city.errors.pattern;
  }
  get cityControl () : FormControl{
    return this.requestForm.get('city') as FormControl
  }
  ngOnInit(): void {
    this.requestForm.controls.city.valueChanges.pipe(
      tap(() =>{
        this.weatherData = undefined;
        this.error = '';
      }),
      debounceTime(1000),
      distinctUntilChanged(),
      filter(value => value !== '' && value !== ' ' && this.validOnlyLetter(value) && value.length < 10),
      switchMap(city => this.http.getWeatherData(city).pipe(
        catchError(err => {
          this.weatherData = undefined;
          this.error = err.error.message;
          return of(undefined);
        })
      )),
      tap(item => this.weatherData = item)
    ).subscribe()
  }
  reset(): void {
    this.cityControl.setValue('', { emitEvent: true });
    this.weatherData = undefined;
    this.error = '';
  }
  validOnlyLetter(value : string) : boolean {
    return !!value.match(/^[a-zA-Z_ ]*$/);
  }
}
