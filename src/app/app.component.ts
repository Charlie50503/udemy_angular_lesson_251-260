import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from "rxjs/operators"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.onFetchPosts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post("https://angular-http-request-dd100-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json", postData)
      .subscribe(responseData => console.log(responseData))
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get("https://angular-http-request-dd100-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json")
      .pipe(map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key })
          }
        }
        return postsArray;
      }))
      .subscribe(posts=>{
        console.log(posts)
      })
  }

}
