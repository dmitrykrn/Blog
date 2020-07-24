import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/core/post';
import { QuillViewComponent, QuillViewHTMLComponent } from 'ngx-quill';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit {
  @ViewChild(QuillViewComponent)
  private quillView: QuillViewComponent;
  @Input() post: Post;
  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }
}
