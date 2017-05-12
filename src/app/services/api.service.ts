import { Injectable } from '@angular/core';
import { ConnectorService } from '../services/connector.service';

import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  constructor(private authHttp: ConnectorService) { }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }


  /* IP ADRESSES */
  public getIps(): Promise<String[]> {
    return this.authHttp.get('/ip')
    .toPromise()
    .then(res => res.json().ips);
  }

  public addIp(ip: String): Promise<String> {
    return this.authHttp.post('/ip/' + ip, null)
    .toPromise()
    .then(res => res.json().ip);
  }

  public removeIp(ip: String): Promise<String> {
    return this.authHttp.delete('/ip/' + ip)
    .toPromise()
    .then(res => res.json().ip);
  }
}
