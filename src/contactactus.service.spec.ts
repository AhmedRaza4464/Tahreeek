import { TestBed } from '@angular/core/testing';

import { ContactactusService } from './contactactus.service';

describe('ContactactusService', () => {
  let service: ContactactusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactactusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
