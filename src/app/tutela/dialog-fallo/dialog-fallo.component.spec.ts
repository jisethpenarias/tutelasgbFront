import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFalloComponent } from './dialog-fallo.component';

describe('DialogFalloComponent', () => {
  let component: DialogFalloComponent;
  let fixture: ComponentFixture<DialogFalloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFalloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFalloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
