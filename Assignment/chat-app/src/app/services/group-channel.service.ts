import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupChannelService {

    constructor(private httpClient: HttpClient) { }

    public fetchGroupData(): Observable<any> {
        return this.httpClient.get('/api/get-groups');
    }

    public fetchChannelData(groupId): Observable<any> {
        return this.httpClient.get('/api/get-channels/' + groupId);
    }

    public deleteChannel(channelId): Observable<any> {
        return this.httpClient.post('/api/delete-channel/', {channel_id: channelId});
    }

}
