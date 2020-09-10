import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


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

  loginDetails = {username: this.username, password: this.password};

  ngOnInit() {

  }

  public loginfunc() {

    console.log(this.loginDetails);
    this.httpClient.post(BACKEND_URL + '/api/login-auth', this.loginDetails, httpOptions)
    .subscribe((data: any) => {
      if (data.ok) {
        localStorage.setItem('active-user', data.toString());
        // this.httpClient.post(BACKEND_URL + '/api/login-success', data, httpOptions)
        // .subscribe((m: any) => {});
        this.router.navigateByUrl('account');
      } else {
        alert('Sorry, invalid username or password');
      }

    });
  }
}
