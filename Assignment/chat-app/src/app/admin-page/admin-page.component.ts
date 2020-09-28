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

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserDataService, private groupChannelService: GroupChannelService, private modalService: NgbModal) { }

    private active_user: boolean;
    public groups: Array<any>;
    public channels: Array<any>;
    public groupForm;
    public channelForm;
    public channelUsers = [];
    public channelActiveUsers;
    public usersArray;
    public channelId:string;
    public tempArray = [];
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

        this.groupForm = this.formBuilder.group({
            group_id: this.groups,
        });

        this.onChanges();
    }

    onChanges(): void {
        this.groupForm.valueChanges.subscribe(val => {
            this.groupChannelService.fetchChannelData(val.group_id).subscribe((data) => {
                this.channels = data;
                this.userService.fetchUsersData().subscribe((data) => {
                    this.usersArray = data;
                    this.channelUsers = [];
                    for(let u of data) {
                        for(let c of this.channels) {
                            for(let gu of c.channel_users) {
                                if(u._id == gu) {
                                    this.channelUsers.push({channel_id: c._id, user_id: u._id, username: u.username});
                                }
                            }
                        }
                    }
                });
            })
        });
    }

    openVerticallyCentered(content) {
        this.tempArray = [];
        this.channelId = content._declarationView[content._declarationView.length - 2];
        for(let user of this.channelUsers) {
            if(this.channelId == user.channel_id) {
                this.tempArray.push(user);
            }
        }
        this.modalService.open(content, { centered: true });
    }


    public deleteChannel() {

        this.groupChannelService.deleteChannel(this.channelId).subscribe( (data) => {
            if(data.ok) {
                this.channels.forEach( (channel, index) => {
                    if(channel._id == this.channelId) {
                        this.channels.splice(index, 1);
                        console.log("Channel Deleted");
                    }
                });
            } else {
                console.log(data);
            }
        });
    }
}
