import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username = sessionStorage.getItem('username');
  birthdate = sessionStorage.getItem('birthdate');
  age = sessionStorage.getItem('age');
  email = sessionStorage.getItem('email');

  constructor(private router: Router) { }

  ngOnInit(){
    console.log(this.username, this.birthdate, this.age, this.email);
  }


  public updateDetails() {

    sessionStorage.setItem('username', this.username.toString());
    sessionStorage.setItem('birthdate', this.birthdate.toString());
    sessionStorage.setItem('age', this.age.toString());
    sessionStorage.setItem('email', this.email.toString());
    this.router.navigateByUrl('profile');
  }
}
