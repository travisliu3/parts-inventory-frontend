import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PartsInventoryHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService // You can inject services here if needed
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the authentication token from localStorage
    const authToken = localStorage.getItem('access_token');

    // Clone the request and add the authorization header
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(request);
  }
}
