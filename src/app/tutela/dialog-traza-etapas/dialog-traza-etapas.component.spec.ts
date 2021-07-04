import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTrazaEtapasComponent } from './dialog-traza-etapas.component';

describe('DialogTrazaEtapasComponent', () => {
  let component: DialogTrazaEtapasComponent;
  let fixture: ComponentFixture<DialogTrazaEtapasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTrazaEtapasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTrazaEtapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
