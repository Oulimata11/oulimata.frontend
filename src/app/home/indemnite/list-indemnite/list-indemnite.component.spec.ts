import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndemniteComponent } from './list-indemnite.component';

describe('ListIndemniteComponent', () => {
  let component: ListIndemniteComponent;
  let fixture: ComponentFixture<ListIndemniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIndemniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIndemniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
