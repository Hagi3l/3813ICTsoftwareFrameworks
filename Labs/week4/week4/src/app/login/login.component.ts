import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";

  database = [
    {
        email: "jon@gmail.com",
        password: "123"
    },
    {
        email: "james@gmail.com",
        password: "321"
    },
    {
        email: "tony@gmail.com",
        password: "432"
    }
];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  itemClicked() {
    if(this.database.some(item => this.email == item.email && this.password == item.password)) {
      this.router.navigateByUrl('/account');
    }

  }

}
