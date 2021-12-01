import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../shared/restApi/restApi.service';
import { RestUrl } from '../shared/urlConstant/urlConstant';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
  })
  export class homeServices {

    constructor(private restService: RestService,private _message: NzMessageService) {}

    getRecord(): Observable<any> {
      return this.restService.create(RestUrl.getCSVRecord,null);
    }

    updateRecord(updatedCSVData): Observable<any> {
      return this.restService.create(RestUrl.updateCSVRecord,updatedCSVData);
    }

    message(type: string,message){
      return this._message.create(type, message,{ nzDuration: 10000} );
    }

  }
