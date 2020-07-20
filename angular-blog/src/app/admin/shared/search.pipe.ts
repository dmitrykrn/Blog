import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/core/post';

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {

  transform(posts: Post[], search: string): Post[] {
    if (search.trim().length === 0){
      return posts;
    }
    posts = posts.filter((post, index, postArray) => {
      const postTitle = post.title.toLowerCase();
      const searchStr = search.toLowerCase();
      return postTitle.includes(searchStr);
    });
    return posts;
  }
}
