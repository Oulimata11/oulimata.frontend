import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndemniteGardienComponent } from './add-indemnite-gardien.component';

describe('AddIndemniteGardienComponent', () => {
  let component: AddIndemniteGardienComponent;
  let fixture: ComponentFixture<AddIndemniteGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIndemniteGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIndemniteGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
