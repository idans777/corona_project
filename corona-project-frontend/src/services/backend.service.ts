import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { graphsModel } from '../models/graphsModel';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'https://localhost:7196';

  constructor(private http: HttpClient) { }

  // graphs requests
  upload(): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/api/Graphs`, null);
  }

  get30LastDays(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/api/Graphs/DailyCases30Days`);
  }

  get3LastMonths(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/api/Graphs/DailyCases3Months`);
  }

  get6LastMonths(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/api/Graphs/DailyCases6Months`);
  }

  getLastYear(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/api/Graphs/DailyCases1Year`);
  }

  getEntirePeriod(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/api/Graphs/DailyCasesAll`);
  }

  getSevenDaysAverage(): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/api/Graphs`);
  }

  
}
