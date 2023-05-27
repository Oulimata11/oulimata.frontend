import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGardienComponent } from './edit-gardien.component';

describe('EditGardienComponent', () => {
  let component: EditGardienComponent;
  let fixture: ComponentFixture<EditGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
