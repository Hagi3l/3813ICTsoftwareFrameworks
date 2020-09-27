import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDataService } from '../services/user-data.service';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'body'}) };
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(private router: Router, private httpClient: HttpClient, private userData: UserDataService) {}

    username: string;
    password: string;
    active_user: boolean = false;
    loginDetails = null;

    ngOnInit() {
        if (this.userData.active_user) {
            this.router.navigateByUrl('');
        }
        this.loginDetails = {username: this.username, password: this.password};
    }

    login() {
        this.httpClient.post(BACKEND_URL + '/api/login-auth', this.loginDetails, httpOptions).subscribe((data: any) => {
            if (data.code == 1 || data.code == 2) {
                console.log('error');
                // display error in login field
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
