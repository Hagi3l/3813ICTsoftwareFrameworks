import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupChannelService {

    constructor(private router: Router, private httpClient: HttpClient) { }

    public fetchGroupData(): Observable<any> {
        return this.httpClient.get('/api/get-groups');
    }

    public fetchChannelData(groupId): Observable<any> {
        console.log('hello');
        return this.httpClient.get('/api/get-channels/' + groupId);
    }

}
