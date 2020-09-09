import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMessage:String;
  messages:Array<{username:String, message:String}> = [];
  ioConnection:any;

  username = sessionStorage.getItem('username');
  room = "Testing";

  constructor(private socketService:SocketService) { }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.socketService.onMessage()
    .subscribe(data=>this.messages.push(data));

    this.socketService.newUserJoined()
    .subscribe(data=> this.messages.push(data));

    this.socketService.userLeftRoom()
    .subscribe(data=> this.messages.push(data));
  }

  public chat() {
    if (this.newMessage) {
      this.socketService.send({username: this.username, room: this.room, message: this.newMessage});
      this.newMessage = '';
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
}
