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
    console.log( JSON.stringify(leds));
    this.authHttp.put('/led', JSON.stringify(leds))
    .toPromise()
    .then();
  }

  /* USERS */
  public getUsers(): Promise<String[]> {
    return this.authHttp.get('/user')
    .toPromise()
    .then(res => res.json().users);
  }

  public addUser(name: String, pass: String): Promise<String> {
    const user = btoa(name + ':' + pass);
    return this.authHttp.post('/user/' + user, null)
    .toPromise()
    .then(res => res.json().user);
  }

  public removeUser(name: String, pass: String): Promise<String> {
    const user = btoa(name + ':' + pass);
    return this.authHttp.delete('/user/' + user)
    .toPromise()
    .then(res => res.json().user);
  }

  /* FILES */
  public getFiles(): Promise<String[]> {
    return this.authHttp.get('/file')
    .toPromise()
    .then(res => res.json());
  }

  public getFileBlob(file: String): Promise<Blob> {
    return this.authHttp.get('/file/' + file)
    .toPromise()
    .then(res => {
      let blob: Blob = new Blob([res.text()]);
      return blob;
    });
  }

  /* SENSOR */
  public getSensorsData(): Promise<any> {
    return this.authHttp.get('/sensor')
    .toPromise()
    .then(res => res.json());
  }

  /* TIME */
  public getTime(): Promise<number> {
    return this.authHttp.get('/time')
    .toPromise()
    .then(res => res.json().time);
  }

  public setTime(time: number): Promise<number> {
    return this.authHttp.put('/time/' + time, null)
    .toPromise()
    .then(res => res.json().time);
  }

}
