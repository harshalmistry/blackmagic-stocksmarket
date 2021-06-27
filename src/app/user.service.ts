import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { environment } from '../environments/environment';

// const USER_URL = 'http://192.168.0.105:5100/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInUserId: any;
  USER_URL = environment.userServiceBaseUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  setLoggedInUserId(userId: any) {
    this.loggedInUserId = userId;
  }

  authenticate(user: User): Observable<Object> {
    return this.http.post<User>(
      this.USER_URL + '/authenticate',
      user,
      this.httpOptions
    );
  }

  register(user: User): Observable<Object> {
    return this.http.post<User>(
      this.USER_URL + '/register',
      user,
      this.httpOptions
    );
  }
}
