import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilUtilisateurComponent } from './edit-profil-utilisateur.component';

describe('EditProfilUtilisateurComponent', () => {
  let component: EditProfilUtilisateurComponent;
  let fixture: ComponentFixture<EditProfilUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfilUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
