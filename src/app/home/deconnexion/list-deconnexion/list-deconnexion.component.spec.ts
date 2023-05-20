import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeconnexionComponent } from './list-deconnexion.component';

describe('ListDeconnexionComponent', () => {
  let component: ListDeconnexionComponent;
  let fixture: ComponentFixture<ListDeconnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDeconnexionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeconnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
