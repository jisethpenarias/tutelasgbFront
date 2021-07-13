import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearUsuarioComponent } from './dialog-crear-usuario.component';

describe('DialogCrearUsuarioComponent', () => {
  let component: DialogCrearUsuarioComponent;
  let fixture: ComponentFixture<DialogCrearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrearUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
