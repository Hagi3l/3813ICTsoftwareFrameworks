import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private router: Router) { }

  active_user:boolean = false;

  ngOnInit() {
    if ("active-user" in localStorage) {
        this.active_user = true;
    }
  }

  logout() {
      if (this.active_user) {
        localStorage.clear();
        this.active_user = false;
        this.router.navigateByUrl('');
        console.log("removed active user storage");
      }
  }
}
