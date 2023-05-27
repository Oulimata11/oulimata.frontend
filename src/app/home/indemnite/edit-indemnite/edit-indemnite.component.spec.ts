import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndemniteComponent } from './edit-indemnite.component';

describe('EditIndemniteComponent', () => {
  let component: EditIndemniteComponent;
  let fixture: ComponentFixture<EditIndemniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIndemniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIndemniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
