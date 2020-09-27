import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private router: Router, private userService: UserDataService) { }

    active_user:boolean = false;
    admin:boolean = false;

    ngOnInit() {
        if (this.userService.active_user) {
            this.active_user = true;
            if(this.userService.roles.includes(this.userService.user_info.role)) {
                this.admin = true;
            }
        }
    }

    logout() {
        if (this.active_user) {
            localStorage.clear();
            this.userService.active_user = false;

            this.router.navigateByUrl('');
            window.location.reload();
        }
    }
}
