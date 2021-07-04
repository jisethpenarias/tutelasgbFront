import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutelasComponent } from './tutelas.component';

describe('TutelasComponent', () => {
  let component: TutelasComponent;
  let fixture: ComponentFixture<TutelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
