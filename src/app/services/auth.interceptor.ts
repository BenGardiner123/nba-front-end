import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    //intercepts all http requests
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = JSON.parse(localStorage.getItem('token'));

        //adds token in the authorization header
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });

        // if error navigate back to login page
        return (next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status) {
                    this.router.navigateByUrl('/Login');
                }
                return throwError(err);
            }
            )));
    }

}