import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCreatePostComponent } from './timeline-create-post.component';

describe('TimelineCreatePostComponent', () => {
  let component: TimelineCreatePostComponent;
  let fixture: ComponentFixture<TimelineCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
