import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPasswordUtilisateurComponent } from './edit-password-utilisateur.component';

describe('EditPasswordUtilisateurComponent', () => {
  let component: EditPasswordUtilisateurComponent;
  let fixture: ComponentFixture<EditPasswordUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPasswordUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPasswordUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
