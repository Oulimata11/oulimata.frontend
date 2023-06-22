import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGardienNoteComponent } from './edit-gardien-note.component';

describe('EditGardienNoteComponent', () => {
  let component: EditGardienNoteComponent;
  let fixture: ComponentFixture<EditGardienNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGardienNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGardienNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
