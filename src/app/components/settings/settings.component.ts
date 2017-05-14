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
  ) {}

  ngOnInit() {
    this.api.getTime().then(time => {
      const date = new Date(time * 1000);
      this.day = new Date();
      this.day.setUTCFullYear(date.getFullYear());
      this.day.setUTCMonth(date.getMonth());
      this.day.setUTCDate(date.getDate());
      this.time = new Date();
      this.time.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    })
  }

}
