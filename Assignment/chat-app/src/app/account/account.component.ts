import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    constructor(private router: Router, private userService: UserDataService) { }

    active_user:boolean = false;
    user_data;

    ngOnInit() {
        if ("active-user" in localStorage) {
            this.active_user = true;
            this.user_data = this.userService.get_user_info();
            console.log(this.user_data);
        } else {
            this.router.navigateByUrl('');
        }
    }
}
