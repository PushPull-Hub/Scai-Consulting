import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  commentButtonClicked: boolean;
  constructor() {}

  ngOnInit(): void {
    this.commentButtonClicked = false;
  }

  whenCommentButtonClicked() {
    this.commentButtonClicked = !this.commentButtonClicked;
  }
}
