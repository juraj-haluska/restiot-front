import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';

import { ConnectorService } from './services/connector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private items: MenuItem[];
  private activeItem: MenuItem;

  private readonly STATUS_OK: String = 'Ok';
  private readonly STATUS_ERROR: String = 'Error';
  private readonly STATUS_CONNECT: String = 'Connecting';

  private status: String = this.STATUS_ERROR;

  private url: String = "https://192.168.15.200";
  private user: String = "admin";
  private pass: String = "admin";

  constructor(
      private connector: ConnectorService,
      private router: Router
    ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'LEDs',
        icon: 'fa-lightbulb-o',
        command: () => {
          this.router.navigate(['/leds']);
        }
      },
      {
        label: 'Sensors',
        icon: 'fa-bar-chart',
        command: () => {
          this.router.navigate(['/sensors']);
        }
      },
      {
        label: 'Files',
        icon: 'fa-files-o',
        command: () => {
          this.router.navigate(['/files']);
        }
      },
      {
        label: 'Access control',
        icon: 'fa-address-book-o',
        command: () => {
          this.router.navigate(['/acl']);
        }
      },
      {
        label: 'Settings',
        icon: 'fa-cog',
        command: () => {
          this.router.navigate(['/settings']);
        }
      },
    ];
  }

  onSave() {
    this.status = this.STATUS_CONNECT;
    this.connector.save(this.url, this.user, this.pass)
    .then((res: Boolean ) => {
      if (res) {
        this.status = this.STATUS_OK;
      } else {
        this.status = this.STATUS_ERROR;
      }
    });
  }

  statusCss(): String {
    if (this.status === this.STATUS_OK) {
      return 'STATUS_OK';
    }
    if (this.status === this.STATUS_ERROR) {
      return 'STATUS_ERROR';
    }
    if (this.status === this.STATUS_CONNECT) {
      return 'STATUS_CONNECT';
    }
  }

}
