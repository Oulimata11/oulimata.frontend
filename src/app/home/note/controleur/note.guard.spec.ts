import { TestBed } from '@angular/core/testing';

import { NoteGuard } from './note.guard';

describe('NoteGuard', () => {
  let guard: NoteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
