import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocalisationComponent } from './list-localisation.component';

describe('ListLocalisationComponent', () => {
  let component: ListLocalisationComponent;
  let fixture: ComponentFixture<ListLocalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLocalisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
