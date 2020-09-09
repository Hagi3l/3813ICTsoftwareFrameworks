import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMessage:string = "";
  messages:string[] = [];
  ioConnection:any;

  constructor(private socketService:SocketService) { }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message:string) => {
      this.messages.push(message);
    });
  }

  public chat() {

    if (this.newMessage) {
      this.socketService.send(this.newMessage);
      this.newMessage=null;
    } else {
      console.log('No Message');
    }
  }
}
