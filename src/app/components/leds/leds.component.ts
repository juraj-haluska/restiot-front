import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { Leds } from '../../models/models';

@Component({
  selector: 'app-leds',
  templateUrl: './leds.component.html',
  styleUrls: ['./leds.component.css']
})
export class LedsComponent implements OnInit {

  private leds: Leds = new Leds(false, false, false);

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getLeds().then((leds: Leds) => {
      this.leds = leds;
    });
  }

  update() {
    this.api.setLeds(this.leds);
  }

}
