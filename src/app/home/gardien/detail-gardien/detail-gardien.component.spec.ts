import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGardienComponent } from './detail-gardien.component';

describe('DetailGardienComponent', () => {
  let component: DetailGardienComponent;
  let fixture: ComponentFixture<DetailGardienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGardienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailGardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
