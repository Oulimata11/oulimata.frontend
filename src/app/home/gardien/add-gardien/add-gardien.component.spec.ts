import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGardienComponent } from './add-gardien.component';

describe('AddGardienComponent', () => {
  let component: AddGardienComponent;
  let fixture: ComponentFixture<AddGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
