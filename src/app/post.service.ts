import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    // { title:title, content:content , id: '0' };
    const postData: Post = { title, content, id: '0' };
    return this.http
      .post<{ name: string }>(
        'https://angular-http-request-dd100-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData,
        {
          observe:'response'
        }
      )
      .subscribe(
        (responseData) => console.log(responseData.body),
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('no1', '1');
    searchParams = searchParams.append('print', 'pretty');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-2a447-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          params: searchParams,
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://angular-http-request-dd100-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      {
        observe:"events"
      }
    ).pipe(tap(event=>{
      console.log(event);
      if(event.type === HttpEventType.Sent){
        console.log(event.type);
      }
      if(event.type === HttpEventType.Response){
        console.log(event.body);
      }
    }))
  }
}
