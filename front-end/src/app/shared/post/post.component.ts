import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
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
  isLikedByMe: boolean;

  constructor(
    private postService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.commentButtonClicked = false;
    // this.isLikedByMe = this._checkIfItsLikedByMe(this.post.postId);
  }

  // whenCommentButtonClicked() {
  //   this.commentButtonClicked = !this.commentButtonClicked;
  // }

  // addComment() {
  //   const _comment: CustomComment = {
  //     postId: this.post.postId,
  //     commentText: this.textInputed,
  //   };
  //   this.addCommentButtonClicked.emit(_comment);
  //   this.textInputed = '';
  // }

  // reactOnPost() {
  //   this.likeButtonClicked.emit(this.post.postId);
  //   this.isLikedByMe = !this.isLikedByMe;
  // }

  // private _checkIfItsLikedByMe(PostId: string): boolean {
  //   return this.postService
  //     .getPostLikers(PostId)
  //     .find((liker) => liker.id == this.authService.loggedUser.id)
  //     ? true
  //     : false;
  // }
}
