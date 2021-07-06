import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReasignarTutelaComponent } from './dialog-reasignar-tutela.component';

describe('DialogReasignarTutelaComponent', () => {
  let component: DialogReasignarTutelaComponent;
  let fixture: ComponentFixture<DialogReasignarTutelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReasignarTutelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReasignarTutelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
