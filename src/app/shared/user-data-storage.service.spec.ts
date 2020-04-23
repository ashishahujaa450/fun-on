import { TestBed } from '@angular/core/testing';

import { UserDataStorageService } from './user-data-storage.service';

describe('UserDataStorageService', () => {
  let service: UserDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
