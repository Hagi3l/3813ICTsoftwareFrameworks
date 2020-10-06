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

    // User Auth
    private active_user: boolean;

    // Init Values
    public groups: Array<any>;
    public channels: Array<any>;
    public channel: Object;

    // FIX NEEDED: USED FOR DISPLAYING AN ERROR WHEN ADMIN TRIES TO ADD A USER TO A CHANNEL WHEN THEY ALREADY ARE
    public errorUser: boolean = false;

    // Users
    private allUsers: Array<any>;

    // Modal
    public closeResult: string;

    // Edit Channel Form
    private channelId = new FormControl({value: '', disabled: true});
    private channelGroupId = new FormControl({value: '', disabled: true});
    private channelName = new FormControl('', Validators.required);
    private channelUsers: Array<any> = [];

    // Edit Group Form
    private groupId = new FormControl({value: '', disabled: true});
    private groupName = new FormControl('', Validators.required);
    public selected_group: any;
    private groupAssistants: Array<any> = [];
    private groupUsers: Array<any> = [];
    public selected_group_assistant: any;


    public ngOnInit(): void {
        this.active_user = this.userService.active_user;
        if (this.active_user && this.userService.roles.includes(this.userService.user_info.role) ) {
        } else {
            this.router.navigateByUrl('');
        }

        this.getGroups();

        this.userService.fetchUsers().subscribe((data) => {
            this.allUsers = data;
        });
    }

    // GROUP FUNCTIONS
    private getGroups() {
        this.groupChannelService.fetchGroupData().subscribe((data) => {
            this.groups = data;
        });
    }

    private getGroupData() {
        this.groupAssistants = [];
        this.groupUsers = [];

        for (const user of this.selected_group.group_assistants) {
            this.userService.fetchUsersData(user).subscribe((data) => {
                this.groupAssistants.push(data);
            });
        }

        for (const user of this.selected_group.group_users) {
            this.userService.fetchUsersData(user).subscribe((data) => {
                this.groupUsers.push(data);
            });
        }
    }

    public deleteGroup() {
        this.groupChannelService.deleteGroup(this.selected_group._id).subscribe( (data) => {
            if(data.ok == 1 && data.n == 1 && data.deletedCount == 1) {
                this.getGroups();
                this.selected_group = null;
            } else { console.log("ERROR Deleting Group");}
        })
    }

    public deleteGroupModal(groupDelete): void {
        this.modalService.open(groupDelete, { centered: true });
    }

    public editGroupModal(groupEdit): void {
        this.getGroupData();
        this.groupId.setValue(this.selected_group._id);
        this.groupName.setValue(this.selected_group.group_name);

        this.modalService.open(groupEdit, { centered: true });
    }

    public addUserToGroupAssis(user: any) {

        const exists = Boolean(this.groupAssistants.find(x => x._id === user._id));

        if (exists || user.role == "super-admin" || user.role == "group-admin") {
            console.log('found user');
            // Display an error to the admin
        } else {
            this.groupAssistants.push(user);
        }

    }


    // CHANNEL FUNCTIONS
    public getChannels(group: any): void  {

        this.selected_group = group;

        this.channels = [];
        this.groupChannelService.fetchChannelData(group._id).subscribe((data) => {
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
                if(data.role == "super-admin" || data.role == "group-admin") {
                    console.log('this is an admin already')
                } else {
                    this.channelUsers.push(data);
                }
            });
        }
    }

    public openChannelEditModel(channelEdit): void {
        this.modalService.open(channelEdit, { centered: true });
    }


    public deleteChannel() {
        this.groupChannelService.deleteChannel(this.channelId.value).subscribe( (data) => {
            if(data.ok == 1 && data.n == 1 && data.deletedCount == 1) {
                this.getChannels({_id: this.channelGroupId.value});
            } else { console.log("ERROR Deleting Channel");}
        });
    }

    public updateChannel() {

        let data = {channel_id: this.channelId.value, channel_name: this.channelName.value, channel_users: this.channelUsers};

        this.groupChannelService.updateChannel(data).subscribe( (data) => {
            if(data.ok == 1 && data.n == 1 && data.nModified == 1) {
                this.getChannels({_id: this.channelGroupId.value});
            } else { console.log("ERROR Updating Channel");}
        });

    }

    public addUserToChannel(user: any) {

        const exists = Boolean(this.channelUsers.find(x => x._id === user._id));

        if (exists || user.role == "super-admin" || user.role == "group-admin") {
            console.log('found user');
            // Display an error to the admin
        } else {
            this.channelUsers.push(user);
        }

    }

};
