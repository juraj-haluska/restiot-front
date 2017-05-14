import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ChartModule, UIChart } from 'primeng/primeng';

class Sample {
  humi: number;
  temp: number;
  press: number;
  time: number;

  constructor(humi: number, temp: number, press: number, time: number) {
    this.humi = humi;
    this.temp = temp;
    this.press = press;
    this.time = time;
  }
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  @ViewChild
    ('temp') chartTemp: UIChart;

  @ViewChild
    ('humi') chartHumi: UIChart;

  @ViewChild
    ('press') chartPress: UIChart;

  private actual: Sample;
  private data: Sample[];

  private plotDataTemp: any;
  private plotDataHumi: any;
  private plotDataPress: any;
  private plotOpts: any;

  private step: number = 1;
  private start: Date = new Date();
  private stop: Date = new Date();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.onActualRefresh();
  }

  onActualRefresh() {
    this.api.getSensorsData().then(data => {
      const temp = Math.round(data.temp * 100) / 100;
      const humi = Math.round(data.humi * 100) / 100;
      const press = Math.round(data.press * 100) / 100;
      this.actual = new Sample(humi, temp, press, null);
    });

    const ref = this;
    this.api.getFileBlob('log.data').then(blob => {
      let reader = new FileReader();
      const callback = this.readerCallback;
      reader.onload = function () {
        callback(ref, reader.result);
      }
      reader.readAsText(blob);
    })
  }

  public readerCallback(ref: any, result: string) {
    ref.data = null;
    ref.data = [];
    const data = result.split('\r\n');
    for (let i = 2; i < data.length; i++) {
      const sample = data[i].split(',');
      ref.data.push(new Sample(
        Number(sample[2]),
        Number(sample[1]),
        Number(sample[3]),
        Number(sample[0])
      ));
    }
    ref.dataReady();
  }


  public dataReady() {

    this.plotDataTemp = null;
    this.plotDataPress = null;
    this.plotDataHumi = null;

    let labels = []
    let temps = [];
    let humis = [];
    let presses = [];

    let counter = 0;

    this.data.map(sample => {
      counter++;
      if ((counter % this.step) == 0) {

        if (this.compareTimes(sample.time)) {

          labels.push(this.timeFormat(sample.time));
          temps.push(sample.temp);
          humis.push(sample.humi);
          presses.push(sample.press);
        }
      }
    });

    this.plotDataTemp = {
      labels: labels,
      datasets: [
        {
          label: 'Temperature',
          data: temps,
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    }

    this.plotDataHumi = {
      labels: labels,
      datasets: [
        {
          label: 'Humidity',
          data: humis,
          fill: false,
          borderColor: '#565656'
        }
      ]
    }

    this.plotDataPress = {
      labels: labels,
      datasets: [
        {
          label: 'Atmospheric pressure',
          data: presses,
          fill: false,
          borderColor: '#f4ce42'
        }
      ]
    }

    this.plotOpts = {
      showLines: true,
    }

    if (this.chartTemp) {
      this.chartTemp.reinit();
      this.chartHumi.reinit();
      this.chartPress.reinit();
    }
  }

  private setTime(time: number): Date {
    const d = new Date(time * 1000);
    const date = new Date();
    date.setUTCFullYear(d.getFullYear());
    date.setUTCMonth(d.getMonth());
    date.setUTCDate(d.getDate());
    date.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    return date;
  }

  private timeToString(date: Date): String {
    let out = '';
    let hours;
    let minutes;
    let seconds;
    hours = date.getUTCHours() + '';
    minutes = date.getUTCMinutes() + '';
    seconds = date.getUTCSeconds() + '';
    if (hours.length < 2) out += '0';
    out += hours;
    out += ':';
    if (minutes.length < 2) out += '0';
    out += minutes;
    out += ':';
    if (seconds.length < 2) out += '0';
    out += seconds;
    return out;
  }

  private compareTimes(utime: number): boolean {
    return true;
    // const time = new Date(utime * 1000);
    // const val = time.valueOf() - 60*60*1000*3; //3 hours shift
    // if ((val >= this.start.valueOf()) && (val <= this.stop.valueOf())) return true;
    // return false;
  }

  private timeFormat(utime: number): String {
    const time = new Date(utime * 1000);
    let out = time.getUTCFullYear() + '/';
    out += (time.getUTCMonth() + 1) + '/';
    out += (time.getUTCDate()) + '\r\n';
    out += this.timeToString(time);
    return out;
  }

}
