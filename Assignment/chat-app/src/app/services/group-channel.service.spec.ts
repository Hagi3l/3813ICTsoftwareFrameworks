import { TestBed } from '@angular/core/testing';

import { GroupChannelService } from './group-channel.service';

describe('GroupChannelService', () => {
  let service: GroupChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
