import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private day: Date;
  private time: Date;

  constructor(
    private api: ApiService
  ) { }

  private setTime(time: number): void {
    const date = new Date(time * 1000);
    this.day = new Date();
    this.day.setUTCFullYear(date.getFullYear());
    this.day.setUTCMonth(date.getMonth());
    this.day.setUTCDate(date.getDate());
    this.time = new Date();
    this.time.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }

  ngOnInit() {
    this.onRefresh();
  }

  private onSetTime() {
    const date = new Date();
    date.setUTCFullYear(this.day.getFullYear());
    date.setUTCMonth(this.day.getMonth());
    date.setUTCDate(this.day.getDate());
    date.setUTCHours(this.time.getHours());
    date.setUTCMinutes(this.time.getMinutes());
    date.setUTCSeconds(this.time.getSeconds());
    const utime = date.valueOf() / 1000;
    this.api.setTime(utime).then(time => {
      this.setTime(time);
    })
  }

  onSetBrowsers() {
    this.day = new Date();
    this.time = new Date();
  }

  onSave() {
    this.onSetTime();
  }

  onRefresh() {
    this.api.getTime().then(time => {
      this.setTime(time);
    });
  }

}
