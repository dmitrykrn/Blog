import { PostsService } from './../../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/post';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public posts$: Observable<Post[]>;
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
  }
}
