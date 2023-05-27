import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndemniteGardienComponent } from './list-indemnite-gardien.component';

describe('ListIndemniteGardienComponent', () => {
  let component: ListIndemniteGardienComponent;
  let fixture: ComponentFixture<ListIndemniteGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIndemniteGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIndemniteGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
