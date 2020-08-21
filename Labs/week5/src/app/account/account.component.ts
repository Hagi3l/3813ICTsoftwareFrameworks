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
  session = null;

  constructor(private router: Router) { }

  ngOnInit(){
    if (sessionStorage.length == 0){
      this.session = false;
      this.router.navigateByUrl('');
    } else {
      this.session = true;
    }
  }


  public updateDetails() {

    sessionStorage.setItem('username', this.username.toString());
    sessionStorage.setItem('birthdate', this.birthdate.toString());
    sessionStorage.setItem('age', this.age.toString());
    sessionStorage.setItem('email', this.email.toString());
    this.router.navigateByUrl('profile');
  }

  logout() {
    console.log('clicked btn');
    this.session = false;
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('');
  }
}
