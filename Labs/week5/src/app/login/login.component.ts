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

  ngOnInit() {}

  public loginfunc() {

    console.log('hello! I am in the login function');
    this.httpClient.post(BACKEND_URL + '/api/auth', this.userDetails, httpOptions)
    .subscribe((data: any) => {
      console.log(data);
      if (data.ok) {
        sessionStorage.setItem('userid', data.userid.toString());
        sessionStorage.setItem('username', data.username.toString());
        sessionStorage.setItem('birthdate', data.birthdate.toString());
        sessionStorage.setItem('age', data.age.toString());
        sessionStorage.setItem('email', data.email.toString());
        this.httpClient.post(BACKEND_URL + '/api/login-success', data, httpOptions)
        .subscribe((m: any) => {console.log(m);});
        this.router.navigateByUrl('profile');

      } else {
        alert('Sorry, invalid username or password');
      }

    });
  }
}
