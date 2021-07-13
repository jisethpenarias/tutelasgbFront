import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearClienteComponent } from './dialog-crear-cliente.component';

describe('DialogCrearClienteComponent', () => {
  let component: DialogCrearClienteComponent;
  let fixture: ComponentFixture<DialogCrearClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrearClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCrearClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
