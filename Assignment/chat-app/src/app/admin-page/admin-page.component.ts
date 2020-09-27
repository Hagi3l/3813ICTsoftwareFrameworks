import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

    constructor(private router: Router, private userService: UserDataService) { }

    active_user:boolean;
    roles = ["super-admin", "group-admin", "group-assistant"]

    ngOnInit() {
        this.active_user = this.userService.active_user;
        if (this.active_user && this.roles.includes(this.userService.user_info.role) ) {
            console.log("Admin user");
        } else {
            this.router.navigateByUrl('');
        }
    }
}
