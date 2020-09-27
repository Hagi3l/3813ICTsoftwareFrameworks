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

    user_data;

    ngOnInit() {
        if (this.userService.active_user) {
            this.user_data = this.userService.user_info;
            console.log(this.user_data);
        } else {
            this.router.navigateByUrl('');
        }
    }
}
