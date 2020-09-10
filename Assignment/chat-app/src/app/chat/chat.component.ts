import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMessage:String;
  messages:Array<{username:String, message:String}> = [];
  groups:Array<{id:Number, group_name:String, users:Array<String>}> = [];
  group:Array<{id:Number, group_name:String, users:Array<String>}>;
  channels:Array<{id:Number, channel_name:String, group_id:Number, users:Array<String>}> = [];
  channel:String;
  ioConnection:any;

  username = localStorage.getItem('username');
  room = "Testing";
  session: boolean;

  constructor(private socketService:SocketService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getGroups();
    this.initIoConnection();
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.socketService.onMessage()
    .subscribe(data => this.messages.push(data));

    this.socketService.newUserJoined()
    .subscribe(data => this.messages.push(data));

    this.socketService.userLeftRoom()
    .subscribe(data => this.messages.push(data));
  }

  private getGroups() {

    this.httpClient.post(BACKEND_URL + '/api/groups', httpOptions)
    .subscribe((data: any) => {
      if (data) {
        data.forEach(g => {
          g.users.forEach(user => {
            if (user == this.username) {
              this.groups.push(g);
              console.log(this.groups);
            }
          });
        });

        // sessionStorage.setItem('id', data.id.toString());
        // sessionStorage.setItem('username', data.username.toString());
        // localStorage.setItem('id', data.id.toString());
        // localStorage.setItem('username', data.username.toString());
        // this.httpClient.post(BACKEND_URL + '/api/login-success', data, httpOptions)
        // .subscribe((m: any) => {});
        // this.router.navigateByUrl('chat');
      } else {
        alert('Sorry, invalid username or password');
      }

    });
  }

  private getChannnels(group_id) {


    this.httpClient.post(BACKEND_URL + '/api/channels', httpOptions)
    .subscribe((data: any) => {
      if (data) {
        data.forEach(c => {
          if (c.group_id == group_id) {
            console.log('found a channel in the group');
            console.log(c.channel_name);
            this.channels.push(c);
          }
        });
        // sessionStorage.setItem('id', data.id.toString());
        // sessionStorage.setItem('username', data.username.toString());
        // localStorage.setItem('id', data.id.toString());
        // localStorage.setItem('username', data.username.toString());
        // this.httpClient.post(BACKEND_URL + '/api/login-success', data, httpOptions)
        // .subscribe((m: any) => {});
        // this.router.navigateByUrl('chat');
      } else {
        alert('Sorry, invalid username or password');
      }

    });
  }

  public chat() {
    if (this.newMessage) {
      this.socketService.send({username: this.username, room: this.room, message: this.newMessage});
      this.newMessage = '';
      //localStorage.setItem('messages', this.messages)
    } else {
      console.log('No Message');
    }
  }

  public join() {
    this.socketService.joinRoom({username: this.username, room: this.room});
  }

  public leave() {
    this.socketService.leaveRoom({username: this.username, room: this.room});
  }

  public groupSelected() {
    this.channels = [];
    this.getChannnels(this.group);

  }
}
