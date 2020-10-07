import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  commentButtonClicked: boolean;
  comment: string;
  @Output() likeButtonClicked = new EventEmitter();
  @Output() addCommentButtonClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.commentButtonClicked = false;
  }

  whenCommentButtonClicked() {
    this.commentButtonClicked = !this.commentButtonClicked;
  }
}
