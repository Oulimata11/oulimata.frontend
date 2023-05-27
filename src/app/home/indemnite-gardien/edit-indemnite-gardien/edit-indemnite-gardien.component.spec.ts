import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndemniteGardienComponent } from './edit-indemnite-gardien.component';

describe('EditIndemniteGardienComponent', () => {
  let component: EditIndemniteGardienComponent;
  let fixture: ComponentFixture<EditIndemniteGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIndemniteGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIndemniteGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
