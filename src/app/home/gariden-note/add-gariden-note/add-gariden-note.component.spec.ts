import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGaridenNoteComponent } from './add-gariden-note.component';

describe('AddGaridenNoteComponent', () => {
  let component: AddGaridenNoteComponent;
  let fixture: ComponentFixture<AddGaridenNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGaridenNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGaridenNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
