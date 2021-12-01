import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class RestService {
    constructor(private http: HttpClient) {}

    public create = (route: string, body:any) => {
      // console.log("route",route,"body",body);
      return this.http.post(environment.urlAddress + route, body);
    };

    public fetch = (route: string) => {
      // console.log("route",route,"body",body);
      return this.http.get(environment.urlAddress + route);
    };

}
