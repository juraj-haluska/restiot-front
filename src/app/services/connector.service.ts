import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConnectorService {

  private headers: Headers = null;
  private url: String;

  constructor(private http: Http) { }

  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }

  public save(url: String, user: String, pass: String): Promise<Boolean> {
    console.log(url, user, pass);
    this.url = url;
    this.headers = new Headers();
    this.headers.append('Authorization', 'Basic ' + btoa(`${ user }:${ pass }`));

    const headers: Headers = this.headers;
    return this.http.get(url + '/check' , { headers })
    .toPromise()
    .then(res => {
      return true;
    })
    .catch(err => {
      return false;
    });
  }

  public clear() {
    this.headers = null;
  }

  public get(path) {
    const headers: Headers = this.headers;
    return this.http.get(this.url + path, {
      headers: headers
    });
  }

  public post(path, data) {
    const headers: Headers = this.headers;
    return this.http.post(this.url + path, data, {
      headers: headers
    });
  }

  public put(path, data) {
    const headers: Headers = this.headers;
    return this.http.put(this.url + path, data, {
      headers: headers
    });
  }

  public delete(path) {
    const headers: Headers = this.headers;
    return this.http.delete(this.url + path, {
      headers: headers
    });
  }
}
