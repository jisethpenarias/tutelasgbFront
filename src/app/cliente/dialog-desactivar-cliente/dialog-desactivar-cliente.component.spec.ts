import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDesactivarClienteComponent } from './dialog-desactivar-cliente.component';

describe('DialogDesactivarClienteComponent', () => {
  let component: DialogDesactivarClienteComponent;
  let fixture: ComponentFixture<DialogDesactivarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDesactivarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDesactivarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
