import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotFoundComponent } from './list-not-found.component';

describe('ListNotFoundComponent', () => {
  let component: ListNotFoundComponent;
  let fixture: ComponentFixture<ListNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
