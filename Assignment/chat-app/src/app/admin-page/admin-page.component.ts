import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { GroupChannelService } from '../services/group-channel.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserDataService, private groupChannelService: GroupChannelService) { }

    private active_user: boolean;
    public groups: Array<any>;
    public channels: Array<any>;
    public myForm;


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

        this.myForm = this.formBuilder.group({
            group_id: this.groups,

        });

        this.onChanges();
    }

    onChanges(): void {
        this.myForm.valueChanges.subscribe(val => {
            this.groupChannelService.fetchChannelData(val.group_id).subscribe((data) => {
                this.channels = data;
            })
        });
    }
}
