import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocieteGardienComponent } from './add-societe-gardien.component';

describe('AddSocieteGardienComponent', () => {
  let component: AddSocieteGardienComponent;
  let fixture: ComponentFixture<AddSocieteGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocieteGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocieteGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
