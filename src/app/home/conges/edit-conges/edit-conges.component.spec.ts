import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCongesComponent } from './edit-conges.component';

describe('EditCongesComponent', () => {
  let component: EditCongesComponent;
  let fixture: ComponentFixture<EditCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCongesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
