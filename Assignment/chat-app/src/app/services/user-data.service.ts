import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

    public active_user:boolean = false;
    user_info;

    constructor() { }


    get_user_info() {
        if (this.active_user) {
            return this.user_info;
        } else {
            this.active_user = true;
            return JSON.parse(localStorage.getItem("active-user"));
        }
    }
}
