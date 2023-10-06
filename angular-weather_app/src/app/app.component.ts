import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faSmog } from '@fortawesome/free-solid-svg-icons';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cityName: string = "Kansas"
  weatherData?: WeatherData; // Define a variable to hold the fetched data
  temperature: number = 0
  visibility: number = 0
  windSpeed: number = 0
  humidity: number = 0
  cloudCover: number = 0
  formattedDate: string = ''
  faWind = faWind
  faSmog = faSmog
  faCloud = faCloud
  faWater = faWater
  constructor(private weatherService: WeatherService, private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.getWeather(this.cityName)
  }
  //fetch the weather 
  private getWeather(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe(
      (response: any) => {
        // This code block is executed when the request is successful
        this.weatherData = response;
        this.temperature = this.weatherData?.data?.values?.temperature ?? 0
        this.visibility = this.weatherData?.data?.values?.visibility ?? 0
        this.windSpeed = this.weatherData?.data?.values?.windSpeed ?? 0
        this.humidity = this.weatherData?.data?.values?.humidity ?? 0
        this.cloudCover = this.weatherData?.data?.values?.cloudCover ?? 0
        this.formattedDate = this.datePipe?.transform(this.weatherData?.data.time, 'EEEE d,yyyy') ?? '';

      },
      (error: any) => {
        // This code block is executed if there's an error during the request
        console.error('Error:', error);
      }
    );
  }

  title = 'angular-weather_app';
  onSubmit() {
    this.getWeather(this.cityName)
    this.cityName = ''

  }
}
