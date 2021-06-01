import { TestBed } from '@angular/core/testing';

import { EventsdeleteService } from './eventsdelete.service';

describe('EventsdeleteService', () => {
  let service: EventsdeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsdeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
