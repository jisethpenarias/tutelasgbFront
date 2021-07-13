import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearSolicitudInformacionComponent } from './dialog-crear-solicitud-informacion.component';

describe('DialogCrearSolicitudInformacionComponent', () => {
  let component: DialogCrearSolicitudInformacionComponent;
  let fixture: ComponentFixture<DialogCrearSolicitudInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrearSolicitudInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCrearSolicitudInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
