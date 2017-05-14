import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

class User {
  public name: String;
  public pass: String;
  public encoded: String;

  constructor(name: String, pass: String, encoded: String) {
    this.name = name;
    this.pass = pass;
    this.encoded = encoded;
  }
}

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.css']
})
export class AclComponent implements OnInit {

  private ipAdresses: String[];
  private newIp: String;

  private users: User[] = [];
  private newUser = new User('', '', '');

  private msgs: Message[] = [];

  constructor(
    private api: ApiService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.api.getIps().then((ips: String[]) => {
      this.ipAdresses = ips;
    });

    this.api.getUsers().then((users: String[]) => {
      users.map(encoded => {
        const token = atob(encoded.toString()).split(':');
        const name = token[0];
        const pass = token[1];
        this.users.push(new User(name, pass, encoded));
      })
    });
  }

  onIpAdd() {
    this.api.addIp(this.newIp).then((ip: String) => {
      if (ip !== '') {
        this.ipAdresses.push(ip);
        this.msgs.push({ severity: 'success', summary: 'IP address was added', detail: '' + ip });
      } else {
        this.msgs.push({ severity: 'error', summary: 'IP address was not added', detail: '' });
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

            this.msgs.push({ severity: 'success', summary: 'IP address was removed', detail: '' + ip });
          }
        });
      }
    });
  }

  onUserAdd() {
    this.api.addUser(this.newUser.name, this.newUser.pass).then(encoded => {
      if (encoded !== '') {
        const token = atob(encoded.toString()).split(':');
        const name = token[0];
        const pass = token[1];
        this.users.push(new User(name, pass, encoded));
        this.msgs.push({ severity: 'success', summary: 'New user was added', detail: '' + name });
      } else {
        this.msgs.push({ severity: 'error', summary: 'New user was not added', detail: '' });
      }
    });
  }

  onUserDelete(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      accept: () => {
        this.api.removeUser(user.name, user.pass).then(encoded => {
          if (encoded != '') {
            this.users = this.users.filter(user => {
              return user.encoded !== encoded
            });

            this.msgs.push({ severity: 'success', summary: 'User was removed', detail: '' + user.name });
          }
        });
      }
    });
  }

}
