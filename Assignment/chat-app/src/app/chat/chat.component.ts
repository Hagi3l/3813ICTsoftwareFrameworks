import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDataService } from '../services/user-data.service';


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
    // groups:Array<{id:Number, group_name:String, users:Array<String>}> = [];

    channels:Array<{id:Number, channel_name:String, group_id:Number, users:Array<String>}> = [];
    channel:String;
    ioConnection:any;

    username = localStorage.getItem('username');
    session: boolean;

    constructor(private socketService:SocketService, private router: Router, private httpClient: HttpClient, private userService: UserDataService) { }

    private active_user: boolean;
    private active_user_details: any;
    private active_user_group_assistant: boolean = false;

    public groups = [];
    public group_selected: any;

    public channel_selected: any = null;

    ngOnInit() {

        this.active_user = this.userService.active_user;
        if (this.active_user && this.userService.roles.includes(this.userService.user_info.role) ) {
            this.active_user_details = this.userService.user_info;
            console.log(this.active_user_details);
        } else {
            this.router.navigateByUrl('');
        }

        this.getGroups();
        this.initIoConnection();
    }

    private initIoConnection() {
        this.socketService.initSocket();
        this.socketService.onMessage().subscribe(data => this.messages.push(data));

        this.socketService.newUserJoined().subscribe(data => this.messages.push(data));

        this.socketService.userLeftRoom().subscribe(data => this.messages.push(data));

        console.log(this.messages);
    }

    private getGroups() {
        this.groups = [];
        this.httpClient.get(BACKEND_URL + '/api/get-groups', httpOptions).subscribe((data: any) => {
            if (this.active_user_details.role == 'super-admin' || this.active_user_details.role == 'group-admin') {
                this.groups = data;
            } else {
                data.forEach(group => {
                    console.log(group.group_users);
                    const exists = Boolean(group.group_assistants.find(x => x === this.active_user_details._id));
                    const exists2 = Boolean(group.group_users.find(x => x === this.active_user_details._id));
                    if (exists || exists2) {
                        exists ? this.active_user_group_assistant = true : this.active_user_group_assistant = false;
                        this.groups.push(group);
                    } else {
                        console.log('not in any groups');
                    }
                });
            }
        });
    }

    private getChannnels(group) {
        this.channels = [];
        this.httpClient.get(BACKEND_URL + '/api/get-channels/' + group._id, httpOptions).subscribe((data: any) => {
            if (this.active_user_group_assistant || this.active_user_details.role == 'super-admin' || this.active_user_details.role == 'group-admin') {
                this.channels = data;
            } else {
                data.forEach(channel => {
                    console.log(channel);
                    const exists = Boolean(channel.channel_users.find(x => x === this.active_user_details._id));
                    if (exists) {
                        this.channels.push(channel);
                    } else {
                        console.log('not in any channels');
                    }
                });
            }
        });
    }


    public chat() {
        if (this.newMessage) {
            // send data to socket to process
            // send message history to database
            let data = {username: this.active_user_details.username, room: this.channel_selected._id, message: this.newMessage};
            this.socketService.send(data);
            this.newMessage = '';

        } else {
            console.log('No Message');
        }
    }

    public join() {
        let data = {username: this.active_user_details.username, room: this.channel_selected._id};
        this.socketService.joinRoom(data);
    }

    public leave() {
        let data = {username: this.active_user_details.username, room: this.channel_selected._id};
        this.socketService.leaveRoom(data);
    }

    public groupSelected(group) {
        this.channel_selected = null;
        this.getChannnels(group);
    }

    public channelSelected(channel) {
        this.channel_selected = channel;
    }
}
