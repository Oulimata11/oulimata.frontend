import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndemniteComponent } from './add-indemnite.component';

describe('AddIndemniteComponent', () => {
  let component: AddIndemniteComponent;
  let fixture: ComponentFixture<AddIndemniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIndemniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIndemniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
