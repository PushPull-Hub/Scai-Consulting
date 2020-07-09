import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstWrapperComponent } from './first-wrapper.component';

describe('FirstWrapperComponent', () => {
  let component: FirstWrapperComponent;
  let fixture: ComponentFixture<FirstWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
