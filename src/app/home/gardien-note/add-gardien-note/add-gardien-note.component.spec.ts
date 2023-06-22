import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGardienNoteComponent } from './add-gardien-note.component';

describe('AddGardienNoteComponent', () => {
  let component: AddGardienNoteComponent;
  let fixture: ComponentFixture<AddGardienNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGardienNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGardienNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
