import { TestBed } from '@angular/core/testing';

import { CongesGuard } from './conges.guard';

describe('CongesGuard', () => {
  let guard: CongesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CongesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
