import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

class Sample {
  humi: number;
  temp: number;
  press: number;

  constructor(humi: number, temp: number, press:number) {
    this.humi = humi;
    this.temp = temp;
    this.press = press;
  }
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  private actual: Sample;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.api.getSensorsData().then(data => {
      const temp = Math.round(data.temp * 100) / 100;
      const humi = Math.round(data.humi * 100) / 100;
      const press = Math.round(data.press * 100) / 100;
      this.actual = new Sample(humi, temp, press);
    })
  }

}
