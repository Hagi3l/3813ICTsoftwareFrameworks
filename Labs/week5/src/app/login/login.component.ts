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

  email = '';
  password = '';
  session = null;

  userDetails = {username: this.email, password: this.password};

  ngOnInit() {
    if (sessionStorage.length > 0){
      this.session = true;
      this.router.navigateByUrl('profile');
    } else {
      this.session = false;
    }

  }

  public loginfunc() {

    this.httpClient.post(BACKEND_URL + '/api/auth', this.userDetails, httpOptions)
    .subscribe((data: any) => {
      if (data.ok) {
        sessionStorage.setItem('userid', data.userid.toString());
        sessionStorage.setItem('username', data.username.toString());
        sessionStorage.setItem('birthdate', data.birthdate.toString());
        sessionStorage.setItem('age', data.age.toString());
        sessionStorage.setItem('email', data.email.toString());
        this.httpClient.post(BACKEND_URL + '/api/login-success', data, httpOptions)
        .subscribe((m: any) => {});
        this.router.navigateByUrl('profile');
      } else {
        alert('Sorry, invalid username or password');
      }

    });
  }
}
