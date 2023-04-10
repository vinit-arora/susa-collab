import { TestBed } from '@angular/core/testing';

import { FirebasePostsService } from './firebase-tweets.service';

describe('FirebaseTweetsService', () => {
  let service: FirebasePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
