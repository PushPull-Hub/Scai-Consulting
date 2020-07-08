import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendshipsSuggestionComponent } from './friendships-suggestion.component';

describe('FriendshipsSuggestionComponent', () => {
  let component: FriendshipsSuggestionComponent;
  let fixture: ComponentFixture<FriendshipsSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendshipsSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendshipsSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
