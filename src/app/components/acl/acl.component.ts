import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.css']
})
export class AclComponent implements OnInit {

  private ipAdresses: String[];
  private newIp: String;

  private msgs: Message[] = [];

  constructor(
    private api: ApiService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.api.getIps().then((ips: String[]) => {
      this.ipAdresses = ips;
    });
  }

  onIpAdd() {
    this.api.addIp(this.newIp).then((ip: String) => {
      if (ip !== '') {
        this.ipAdresses.push(ip);
        this.msgs.push({ severity: 'success', summary: 'IP address added', detail: '' + ip });
      } else {
        this.msgs.push({ severity: 'error', summary: 'IP address was not added', detail: ''});
      }
    });
  }

  onIpDelete(ip: String) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this ip?',
      accept: () => {
        this.api.removeIp(ip).then((removedIp: String) => {
          if (ip !== '') {
            this.ipAdresses = this.ipAdresses.filter(filter => {
              return ip !== filter;
            });

            this.msgs.push({ severity: 'success', summary: 'IP address removed', detail: '' + ip });
          }
        });
      }
    });
  }

}
