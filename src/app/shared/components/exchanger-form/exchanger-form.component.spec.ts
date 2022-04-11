import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangerFormComponent } from './exchanger-form.component';

describe('ExchangerFormComponent', () => {
  let component: ExchangerFormComponent;
  let fixture: ComponentFixture<ExchangerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
