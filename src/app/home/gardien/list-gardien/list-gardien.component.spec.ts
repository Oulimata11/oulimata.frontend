import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGardienComponent } from './list-gardien.component';

describe('ListGardienComponent', () => {
  let component: ListGardienComponent;
  let fixture: ComponentFixture<ListGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
