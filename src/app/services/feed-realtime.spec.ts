import { TestBed } from '@angular/core/testing';

import { FeedRealtime } from './feed-realtime';

describe('FeedRealtime', () => {
  let service: FeedRealtime;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedRealtime);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
