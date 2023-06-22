import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGardienNoteComponent } from './list-gardien-note.component';

describe('ListGardienNoteComponent', () => {
  let component: ListGardienNoteComponent;
  let fixture: ComponentFixture<ListGardienNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGardienNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGardienNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
