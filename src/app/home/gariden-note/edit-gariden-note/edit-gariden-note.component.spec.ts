import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGaridenNoteComponent } from './edit-gariden-note.component';

describe('EditGaridenNoteComponent', () => {
  let component: EditGaridenNoteComponent;
  let fixture: ComponentFixture<EditGaridenNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGaridenNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGaridenNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
