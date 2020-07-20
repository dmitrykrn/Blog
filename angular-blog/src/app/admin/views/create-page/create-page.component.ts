import { PostsService } from './../../../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Post } from 'src/app/core/post';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  isWaiting: boolean;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required])
    });
    this.isWaiting = false;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const post = new Post();
    post.title = this.form.value.title;
    post.content = this.form.value.content;
    post.author = this.form.value.author;
    post.date = new Date();
    this.postsService.create(post).subscribe(
      (newPost: Post) => {
        this.form.reset();
        console.log('Post was created successfully', newPost);
        alert('Post was created successfully');
      },
    );
    return null;
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
