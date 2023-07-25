import { TestBed } from '@angular/core/testing';

import { AbsenceGuard } from './absence.guard';

describe('AbsenceGuard', () => {
  let guard: AbsenceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AbsenceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
