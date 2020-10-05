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
    public usersNIC: Array<any> = [];
    public channel;
    public selected_group: Object;

    public selected_user_add_channel;
    //FIX NEEDED: USED FOR DISPLAYING AN ERROR WHEN ADMIN TRIES TO ADD A USER TO A CHANNEL WHEN THEY ALREADY ARE
    public errorUser: boolean = false;

    //Users
    private allUsers: Array<any>;

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

        this.userService.fetchUsers().subscribe((data) => {
            this.allUsers = data;
        });
    }

    public getChannels(groupId: string): void  {
        this.channels = [];
        this.groupChannelService.fetchChannelData(groupId).subscribe((data) => {
            this.channels = data;
        });
    }

    public getChannelsUsers(channel: any): void {
        this.channelUsers = [];
        this.channel = channel;

        for (const user of channel.channel_users) {
            this.userService.fetchUsersData(user).subscribe((data) => {
                this.channelUsers.push(data);
            });
        }
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

    public addUserToChannel(user: any) {

        const exists = Boolean(this.channelUsers.find(x => x._id === user._id));

        if (exists) {
            console.log('found user');
            // Display an error to the admin
        } else {
            this.channelUsers.push(user);
        }

    }
};
