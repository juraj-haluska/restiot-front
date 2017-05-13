import { Injectable } from '@angular/core';
import { ConnectorService } from '../services/connector.service';

import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Leds } from '../models/models';

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

  /* LEDS */
  public getLeds(): Promise<Leds> {
    return this.authHttp.get('/led')
    .toPromise()
    .then(res => {
      const data = res.json();
      return new Leds(data.led1, data.led2, data.led3);
    });
  }
  
  public setLeds(leds: Leds): void {
    this.authHttp.post('/led', JSON.stringify(leds))
    .toPromise()
    .then();
  }

}
