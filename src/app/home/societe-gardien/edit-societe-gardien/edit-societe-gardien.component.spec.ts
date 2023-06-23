import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSocieteGardienComponent } from './edit-societe-gardien.component';

describe('EditSocieteGardienComponent', () => {
  let component: EditSocieteGardienComponent;
  let fixture: ComponentFixture<EditSocieteGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSocieteGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSocieteGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
