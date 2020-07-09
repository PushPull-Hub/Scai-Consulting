import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondWrapperComponent } from './second-wrapper.component';

describe('SecondWrapperComponent', () => {
  let component: SecondWrapperComponent;
  let fixture: ComponentFixture<SecondWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
