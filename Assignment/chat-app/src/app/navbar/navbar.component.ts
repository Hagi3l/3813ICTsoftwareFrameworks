import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private router: Router, private userData: UserDataService) { }

    active_user:boolean = false;

    ngOnInit() {
        if (this.userData.active_user) {
            this.active_user = true;
        }
    }

    logout() {
        if (this.active_user) {
            localStorage.clear();
            this.userData.active_user = false;

            this.router.navigateByUrl('');
            window.location.reload();
        }
    }
}
