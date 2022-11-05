import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    req= req.clone({
      headers:req.headers.append('Auth','xyz'),
    })
    return next.handle(req).pipe(tap(event=>{
      if(event.type === HttpEventType.Response){
        console.log("Response arrived , body data.");
        console.log(event.body);
      }
    }));

  }
}
