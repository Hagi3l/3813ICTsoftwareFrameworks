import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private httpClient: HttpClient, private userService: UserDataService) {}

    username: string;
    password: string;
    active_user: boolean = false;
    loginDetails = null;

    public error: any;

    ngOnInit() {
        if (this.userService.active_user) {
            this.router.navigateByUrl('');
        }
        this.loginDetails = {username: this.username, password: this.password};
    }

    login() {
        this.httpClient.post('/api/login-auth', this.loginDetails).subscribe((data: any) => {
            if (data.code == 1 || data.code == 2) {
                this.error = data;
            } else {
                localStorage.setItem('active-user', JSON.stringify(
                    {
                        "user": data,
                        "session": true
                    }
                ));
                location.reload();
            }
        });
    }
}
