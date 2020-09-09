import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;

  constructor() { }

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  public send(data: any) {
    this.socket.emit('message', data);
  }

  public onMessage(): Observable<any> {
    let observable = new Observable<{username:String, message:String}>(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnected();}
    });
    return observable;
  }

  public joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  public newUserJoined() {
    let observable = new Observable<{username:String, message:String}>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnected();}
    });
    return observable;
  }

  public leaveRoom(data: any) {
    this.socket.emit('leave', data);
  }

  public userLeftRoom() {
    let observable = new Observable<{username:String, message:String}>(observer => {
      this.socket.on('user left', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnected();}
    });
    return observable;
  }
}
