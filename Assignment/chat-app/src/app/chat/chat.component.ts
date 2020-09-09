import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMessage:string = "";
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
    // this.ioConnection = this.socketService.onMessage().subscribe((message:string) => {
    //   this.messages.push(message);
    // });
    this.socketService.newUserJoined()
    .subscribe(data=> this.messages.push(data));
  }

  public chat() {

    if (this.newMessage) {
      this.socketService.send(this.newMessage);
      this.newMessage=null;
    } else {
      console.log('No Message');
    }
  }

  public join() {
    this.socketService.joinRoom({username: this.username, room: this.room});
  }
}
