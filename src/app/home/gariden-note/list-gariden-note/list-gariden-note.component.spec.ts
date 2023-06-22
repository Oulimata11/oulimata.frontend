import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGaridenNoteComponent } from './list-gariden-note.component';

describe('ListGaridenNoteComponent', () => {
  let component: ListGaridenNoteComponent;
  let fixture: ComponentFixture<ListGaridenNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGaridenNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGaridenNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
