import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReplaySubject, map, of } from 'rxjs';
import { User } from '../shared/models/account/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Address } from '../shared/models/account/address';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {}

  loadCurrentUser(token: string | null) {
    if (!token) {
      this.currentUserSource.next(null);
      return of(null);
    }

    return this.httpClient.get<User>(`${this.baseUrl}/account`, {}).pipe(
      map((user) => {
        if (!user) return null;

        this.setToken(user);
        return user;
      })
    );
  }

  login(values: any) {
    return this.httpClient
      .post<User>(`${this.baseUrl}/account/login`, values)
      .pipe(
        map((user) => {
          this.setToken(user);
        })
      );
  }

  register(values: any) {
    return this.httpClient
      .post<User>(`${this.baseUrl}/account/register`, values)
      .pipe(
        map((user) => {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    let requestParams = new HttpParams();
    requestParams = requestParams.append('email', email);

    return this.httpClient.get<boolean>(`${this.baseUrl}/account/email`, {
      params: requestParams,
    });
  }

  getUserAddress() {
    return this.httpClient.get<Address>(`${this.baseUrl}/account/address`);
  }

  updateUserAddress(address: Address) {
    return this.httpClient.put(`${this.baseUrl}/account/address`, address);
  }

  private setToken(user: User) {
    localStorage.setItem('token', user.token);
    this.currentUserSource.next(user);
  }
}
