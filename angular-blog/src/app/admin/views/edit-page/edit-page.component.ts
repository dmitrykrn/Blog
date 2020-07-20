import { PostsService } from './../../../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/core/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  isWaiting: boolean;
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
    ) { }

  ngOnInit(): void {
    this.isWaiting = true;
    this.route.params.subscribe((params: Params) => {
      console.log('Received post id:', params.id);
      this.postsService.getById(params.id).subscribe((post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          content: new FormControl(post.content, Validators.required)
        });
        console.log('Created form:', this.form);
        this.isWaiting = false;
      });
    });
  }

  public submit(){
    this.isWaiting = true;
    this.post.title = this.form.get('title').value;
    this.post.content = this.form.get('content').value;
    this.postsService.update(this.post).subscribe(post => {
      console.log('Post updated successfully:', post);
      alert('Post updated successfully');
    });
    this.isWaiting = false;
  }

  isInvalid(name: string): boolean{
    const control = this.form.get(name);
    return control.invalid && (control.touched || control.dirty);
  }

  isEmpty(name: string){
    const control = this.form.get(name);
    return control.errors.required;
  }
}
