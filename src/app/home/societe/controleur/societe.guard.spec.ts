import { TestBed } from '@angular/core/testing';

import { SocieteGuard } from './societe.guard';

describe('SocieteGuard', () => {
  let guard: SocieteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SocieteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
