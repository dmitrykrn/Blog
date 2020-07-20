import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../core/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }

  public create(post: Post): Observable<Post> {
    const url = environment.apiUrl + '/posts';
    return this.http.post<Post>(url, post);
  }

  public getAll(): Observable<Post[]> {
    const url = environment.apiUrl + '/posts';
    return this.http.get<Post[]>(url);
  }

  public getById(id: string): Observable<Post> {
    const url = environment.apiUrl + '/posts/' + id;
    return this.http.get<Post>(url);
  }

  delete(id: string): Observable<any> {
    const url = environment.apiUrl + '/posts/' + id.toString();
    return this.http.delete(url);
  }

  update(post: Post): Observable<Post>{
    const url = environment.apiUrl + '/posts';
    return this.http.put<Post>(url, post);
  }
}
