import { TestBed } from '@angular/core/testing';

import { AffectationGuard } from './affectation.guard';

describe('AffectationGuard', () => {
  let guard: AffectationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AffectationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
