import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesInformacionComponent } from './solicitudes-informacion.component';

describe('SolicitudesInformacionComponent', () => {
  let component: SolicitudesInformacionComponent;
  let fixture: ComponentFixture<SolicitudesInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
