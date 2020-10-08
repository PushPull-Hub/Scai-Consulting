import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
type CustomComment = { postId: string; commentText: string };

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  commentButtonClicked: boolean;
  textInputed: string;
  @Input() post: Post;
  @Output() likeButtonClicked = new EventEmitter();
  @Output() addCommentButtonClicked = new EventEmitter<CustomComment>();

  constructor() {}

  ngOnInit(): void {
    this.commentButtonClicked = false;
  }

  whenCommentButtonClicked() {
    this.commentButtonClicked = !this.commentButtonClicked;
  }

  addComment() {
    const _comment: CustomComment = {
      postId: this.post.postId,
      commentText: this.textInputed,
    };
    this.addCommentButtonClicked.emit(_comment);
    this.textInputed = '';
  }
}
