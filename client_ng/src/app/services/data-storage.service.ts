import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchValues() {
    return this.http.get(`${environment.BASE_URL}/values/current`);
  }
  fetchIndexes() {
    return this.http.get(`${environment.BASE_URL}/values/all`);
  }
  calculateFib(value: number) {
    return this.http.post(`${environment.BASE_URL}/values`, { index: value });
  }
}
