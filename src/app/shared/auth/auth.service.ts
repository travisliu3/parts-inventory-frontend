import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Token } from './auth.model';
import { BuildEnvironment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseurl = BuildEnvironment.GetEnvironmentUrl();

  constructor(private http: HttpClient, private router: Router) {}

  acquireToken = (): Observable<Object> => {
    return this.http.post<Object>(this.baseurl + '/auth/refresh-token', {});
  };

  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('access_token');
    return token ? true : false;
  };

  register = (user: User) => {
    return this.http
      .post<User>(this.baseurl + '/auth/register', {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      })
      .pipe(catchError(this.handleError));
  };

  login = (user: User) => {
    return this.http
      .post<Token>(this.baseurl + '/auth/authenticate', {
        email: user.email,
        password: user.password,
      })
      .pipe(catchError(this.handleError));
  };

  logout = () => {};

  getUserName = (): Observable<string> => {
    return this.http
      .get<string>(this.baseurl + '/users/getUserName', { responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  };

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    console.error(errorMessage);
    localStorage.clear();
    this.router.navigateByUrl('/logIn');
    return throwError(() => new Error(errorMessage));
  }
}
