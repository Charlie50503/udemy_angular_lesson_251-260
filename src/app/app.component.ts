import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  private fetchPosts(){
    this.http.get("https://angular-http-request-dd100-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json")
    .subscribe(responseData=>{
      console.log(responseData)
    })
  }

}
