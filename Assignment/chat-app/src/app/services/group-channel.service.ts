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

    public deleteGroup(id: string): Observable<any> {
        return this.httpClient.post('/api/delete-group', {id: id});
    }

    public updateGroup(data: Object): Observable<any> {
        return this.httpClient.post('/api/update-group', data);
    }

    public fetchChannelData(groupId: string): Observable<any> {
        return this.httpClient.get('/api/get-channels/' + groupId);
    }

    public deleteChannel(channelId: string): Observable<any> {
        return this.httpClient.post('/api/delete-channel/', {channel_id: channelId});
    }

    public updateChannel(channel: Object): Observable<any> {
        return this.httpClient.post('/api/update-channel', channel);
    }

    public addChannel(channel: Object): Observable<any> {
        return this.httpClient.post('/api/add-new-channel', channel);
    }

    public saveChat(data: Object): Observable<any> {
        return this.httpClient.post('/api/save-chat-history', data);
    }

}
