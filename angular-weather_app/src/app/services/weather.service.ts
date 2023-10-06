import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeatherData(cityName: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add more headers as needed
    });
    const url = environment.weatherApiBaseUrl + 'location=' + cityName + '&apikey=' + environment.keyApi
    console.log('url: ', url)
    return this.http.get<WeatherData>(url, { headers: headers })
  }
}
