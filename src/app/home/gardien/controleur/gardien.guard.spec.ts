import { TestBed } from '@angular/core/testing';

import { GardienGuard } from './gardien.guard';

describe('GardienGuard', () => {
  let guard: GardienGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GardienGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
