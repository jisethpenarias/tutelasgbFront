import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDesactivarUsuarioComponent } from './dialog-desactivar-usuario.component';

describe('DialogDesactivarUsuarioComponent', () => {
  let component: DialogDesactivarUsuarioComponent;
  let fixture: ComponentFixture<DialogDesactivarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDesactivarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDesactivarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
