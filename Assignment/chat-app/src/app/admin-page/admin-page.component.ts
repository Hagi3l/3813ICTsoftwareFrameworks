import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { GroupChannelService } from '../services/group-channel.service';
import { FormControl, Validators } from '@angular/forms';
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
    public channel: Object;
    public selected_group: string;

    //FIX NEEDED: USED FOR DISPLAYING AN ERROR WHEN ADMIN TRIES TO ADD A USER TO A CHANNEL WHEN THEY ALREADY ARE
    public errorUser: boolean = false;

    //Users
    private allUsers: Array<any>;

    // Modal
    public closeResult: string;

    // Edit Channel Form
    private channelId = new FormControl({value: '', disabled: true});
    private channelGroupId = new FormControl({value: '', disabled: true});
    private channelName = new FormControl('', Validators.required);



    public ngOnInit(): void {
        this.active_user = this.userService.active_user;
        if (this.active_user && this.userService.roles.includes(this.userService.user_info.role) ) {
            console.log("Admin user");
        } else {
            this.router.navigateByUrl('');
        }

        this.getGroups();

        this.userService.fetchUsers().subscribe((data) => {
            this.allUsers = data;
        });
    }

    private getGroups() {
        this.groupChannelService.fetchGroupData().subscribe((data) => {
            this.groups = data;
        });
    }

    public getChannels(groupId: string): void  {
        this.selected_group = groupId;
        this.channels = [];
        this.groupChannelService.fetchChannelData(groupId).subscribe((data) => {
            this.channels = data;
        });
    }

    public getChannelsUsers(channel: any): void {

        this.channelId.setValue(channel._id);
        this.channelGroupId.setValue(channel.group_id);
        this.channelName.setValue(channel.channel_name);

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

        let data = {channel_id: this.channelId.value, channel_name: this.channelName.value, channel_users: this.channelUsers};

        this.groupChannelService.updateChannel(data).subscribe( (data) => {
            if(data.ok == 1 && data.n == 1 && data.nModified == 1) {
                this.getChannels(this.channelGroupId.value);
            } else { console.log("ERROR Updating Channel");}
        });

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

    public deleteGroup() {
        this.groupChannelService.deleteGroup(this.selected_group).subscribe( (data) => {
            if(data.ok == 1 && data.n == 1 && data.deletedCount == 1) {
                this.getGroups();
            } else { console.log("ERROR Deleting Group");}
        })
    }
};
