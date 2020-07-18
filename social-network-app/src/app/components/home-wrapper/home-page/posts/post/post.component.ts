import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  loggedUserName = this.postsService.loggedUserName;
  commentButtonClicked: boolean = false;
  comments: string[];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  onCommentButtonClicked() {
    this.commentButtonClicked = !this.commentButtonClicked;
  }
  onLikeButtonClicked(id: string) {
    this.postsService.likePost(id);
  }
}
