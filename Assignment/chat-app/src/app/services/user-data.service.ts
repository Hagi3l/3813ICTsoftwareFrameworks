import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

    private _active_user:boolean = false;
    private _user_info;

    constructor() { }

    get active_user() {
        if(localStorage.getItem("active-user")) {
            let storage = JSON.parse(localStorage.getItem("active-user"));
            this._user_info = storage.user;
            this._active_user = storage.session;
            return this._active_user;
        }
    }
    set active_user(status) {
        this._active_user = status
    }

    get user_info() { return this._user_info; }
}
