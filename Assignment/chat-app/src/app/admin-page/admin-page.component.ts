import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { GroupChannelService } from '../services/group-channel.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

    constructor(private router: Router, private userService: UserDataService, private groupChannelService: GroupChannelService, private modalService: NgbModal) { }

    //User Auth
    private active_user: boolean;

    // Init Values
    public groups: Array<any>;
    public channels: Array<any>;
    public channelUsers: Array<any> = [];
    public channel;
    public selected_group: Object;

    // Modal
    closeResult: string;


    public ngOnInit(): void {
        this.active_user = this.userService.active_user;
        if (this.active_user && this.userService.roles.includes(this.userService.user_info.role) ) {
            console.log("Admin user");
        } else {
            this.router.navigateByUrl('');
        }

        this.groupChannelService.fetchGroupData().subscribe((data) => {
            this.groups = data;
        });
    }

    public getChannels(groupId): void  {
        this.channels = [];
        this.groupChannelService.fetchChannelData(groupId).subscribe((data) => {
            this.channels = data;
        });
    }

    public getChannelsUsers(channel): void {
        this.channelUsers = [];
        this.channel = channel;
        let users = this.getUsers();
        console.log(users);
        for (const user of channel.channel_users) {
            this.userService.fetchUsersData(user).subscribe((data) => {
                this.channelUsers.push(data);
            });
        }
    }

    private getUsers() {
        let  udata;
        this.userService.fetchUsers().subscribe((data) => {
            udata = data;
            console.log(data);
        });
        return udata;
    }

    public openVerticallyCentered(content): void {
        this.modalService.open(content, { centered: true });
    }

    public deleteChannel(channel) {
        this.groupChannelService.deleteChannel(channel._id).subscribe( (data) => {
            if(data.ok == 1 && data.n == 1 && data.deletedCount == 1) {
                this.getChannels(channel.group_id);
            } else { console.log("ERROR Deleting Channel");}
        });
    }

    public updateChannel() {

    }

}
