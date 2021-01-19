import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'types/model';
import { storageUtils } from 'utils/storage';
import { AuthApiService } from '../api/auth.api.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user$ = new BehaviorSubject<any>(null);
  public currentUser: Observable<User>;


  constructor(
    private http: HttpClient,
    private authApi: AuthApiService
  ) {
      this.user$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.user$.asObservable();
  }

  public get currentUserValue(): User {
    return this.user$.value;
}

  login(body) {
    return this.authApi.login(body)
      .pipe(map(res => {
        storageUtils.set('token', res.token);
        // this.user$.next(user)
        return res;
      }));
  }

  logout() {
    storageUtils.clear();
    this.user$.next(null);
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = storageUtils.get('refreshToken');
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${environment.apiUrl}/refresh-token`,
      {
        refreshToken
      }).pipe(
        tap(response => {
          storageUtils.set('token', response.accessToken);
          storageUtils.set('refreshToken', response.refreshToken);
        })
      );
  }

  getCurrentUser(): Observable<any> {
    return this.user$.pipe(
      switchMap(user => {
        // check if we already have user data
        if (user) {
          return of(user);
        }
        const token = storageUtils.get('token');
        // if there is token then fetch the current user
        if (token) {
          return this.fetchCurrentUser();
        }
        return of(null);
      })
    );
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/current-user`)
      .pipe(
        tap(user => {
          this.user$.next(user);
        })
      );
  }
}
