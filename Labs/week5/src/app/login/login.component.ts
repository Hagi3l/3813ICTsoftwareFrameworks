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

  // insert form username and password to userpwd object
  // userpwd: Userpwd = {username: '', password: ''};
  // userobj: Userobj = '';
  constructor(private router: Router, private httpClient: HttpClient) {}

  email = '';
  password = '';

  userDetails = {username: this.email, password: this.password};
  userObj = {userid: 1, username: this.userDetails.username, userbirthdate: null, userage: 100};

  ngOnInit() {}

  public loginfunc() {

    console.log('hello! I am in the login function');
    this.httpClient.post(BACKEND_URL + '/api/auth', this.userDetails, httpOptions)
    .subscribe((data: any) => {
      console.log(data);
      if (data.ok) {
        this.httpClient.post(BACKEND_URL + '/api/login-success', data, httpOptions)
        .subscribe((m: any) => {console.log('hello');});
        this.router.navigateByUrl('account');

      } else {
        alert('Sorry, invalid username or password');
      }

    });
  }
}
