import { TestBed } from '@angular/core/testing';

import { IndemniteGardienGuard } from './indemnite-gardien.guard';

describe('IndemniteGardienGuard', () => {
  let guard: IndemniteGardienGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IndemniteGardienGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
