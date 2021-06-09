import { TestBed } from '@angular/core/testing';

import { GetalleventsService } from './getallevents.service';

describe('GetalleventsService', () => {
  let service: GetalleventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetalleventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
