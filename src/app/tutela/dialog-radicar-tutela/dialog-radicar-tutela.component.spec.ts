import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRadicarTutelaComponent } from './dialog-radicar-tutela.component';

describe('DialogRadicarTutelaComponent', () => {
  let component: DialogRadicarTutelaComponent;
  let fixture: ComponentFixture<DialogRadicarTutelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRadicarTutelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRadicarTutelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
