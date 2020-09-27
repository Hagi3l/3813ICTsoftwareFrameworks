import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'body'}) };
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    constructor(private router: Router, private httpClient: HttpClient) {}

    username: string;
    password: string;
    session: boolean;

    loginDetails = null;

    ngOnInit() {
        if ("active-user" in localStorage) {
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
                localStorage.setItem('active-user', data.toString());
                this.router.navigateByUrl('account');
            }
        });
    }
}
