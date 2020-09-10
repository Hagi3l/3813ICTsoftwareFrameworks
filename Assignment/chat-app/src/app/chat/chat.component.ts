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
    session: boolean;

    constructor(private socketService:SocketService, private router: Router, private httpClient: HttpClient) { }

    ngOnInit() {

      try {
          this.username;
          }
        catch(err){
          alert ("Please login");
          this.router.navigateByUrl('/login');
        }

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

        console.log(this.messages);
    }

    private getGroups() {

        this.httpClient.post(BACKEND_URL + '/api/groups', httpOptions)
        .subscribe((data: any) => {
            if (data) {
                data.forEach(g => {
                    g.users.forEach(user => {
                        if (user == this.username) {
                            this.groups.push(g);
                        }
                    });
                });
            } else {
                alert('No groups, please add some in the admin panel');
            }

        });
    }

    private getChannnels(group_id) {

        this.httpClient.post(BACKEND_URL + '/api/channels', httpOptions)
        .subscribe((data: any) => {
            if (data) {
                data.forEach(c => {
                    if (c.group_id == group_id) {
                        this.channels.push(c);
                    }
                });
            } else {
                alert('No channels available, please add some in the admin panel');
            }

        });
    }


    public chat() {
        if (this.newMessage) {

            this.socketService.send({username: this.username, room: this.channel, message: this.newMessage});
            this.newMessage = '';

        } else {
            console.log('No Message');
        }
    }

    public join() {

        this.socketService.joinRoom({username: this.username, room: this.channel});
    }

    public leave() {
        this.socketService.leaveRoom({username: this.username, room: this.channel});
    }

    public groupSelected() {
        this.channels = [];
        this.getChannnels(this.group);

    }
}
