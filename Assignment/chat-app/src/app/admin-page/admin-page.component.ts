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
    public channelUsers: Array<any> = [];
    public channelActiveUsers;
    public usersArray;
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

        this.channelForm = this.formBuilder.group({
           channel_id: this.channels,
        });

        this.onChanges();
    }

    onChanges(): void {
        this.channelUsers = [];
        this.groupForm.valueChanges.subscribe(val => {
            this.groupChannelService.fetchChannelData(val.group_id).subscribe((data) => {
                this.channels = data;
                this.userService.fetchUsersData().subscribe((data) => {
                    this.usersArray = data;
                    for(let u of data) {
                        for(let g of this.channels) {
                            for(let gu of g.channel_users) {
                                if(u._id == gu) {
                                    this.channelUsers.push({id: u._id, username: u.username });
                                }
                            }
                        }


                    }
                    console.log(this.channels);
                    console.log(this.usersArray);
                    console.log(this.channelUsers);

                })

            })
        });
        this.channelForm.valueChanges.subscribe(val => {
            console.log(val);
        });
    }

    openVerticallyCentered(content) {
        this.modalService.open(content, { centered: true });
      }
}
