import { AlertService } from './../../shared/services/alert.service';
import { PostsService } from './../../../shared/posts.service';
import { Post } from './../../../core/post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[];
  private getAllStream: Subscription;
  private deleteStream: Subscription;
  public searchStr = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllStream = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  public delete(id: string): void {
    if (!confirm('Delete post?')){
      return;
    }
    this.postsService.delete(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id );
      this.alert.warning('Post was successfully deleted');
    });
  }

  ngOnDestroy(): void {
    if (this.getAllStream){
      this.getAllStream.unsubscribe();
    }
    if (this.deleteStream){
      this.deleteStream.unsubscribe();
    }
  }
}
