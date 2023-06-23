import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSocieteGardienComponent } from './list-societe-gardien.component';

describe('ListSocieteGardienComponent', () => {
  let component: ListSocieteGardienComponent;
  let fixture: ComponentFixture<ListSocieteGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSocieteGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSocieteGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
