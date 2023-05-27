import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocalisationComponent } from './edit-localisation.component';

describe('EditLocalisationComponent', () => {
  let component: EditLocalisationComponent;
  let fixture: ComponentFixture<EditLocalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLocalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
