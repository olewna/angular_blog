import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public constructor(private httpClient: HttpClient) {}
  private whoIsLogged: string = '';
  private isLogged: boolean = false;
  private id: string = '';

  public checkIfLogged(): boolean {
    return this.isLogged;
  }

  public logIn(user: User): void {
    this.isLogged = true;
    this.whoIsLogged = user.login;
    this.id = user.id;
  }

  public logOut(): void {
    this.isLogged = false;
    this.whoIsLogged = '';
    this.id = '';
  }
  public getWhoIsLogged(): string {
    return this.whoIsLogged;
  }

  public getId(): string {
    return this.id;
  }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('api/users');
  }

  public getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>('api/users/' + id);
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>('api/users', user);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>('api/users/' + user.id, user);
  }

  public deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`/api/users/${id}`, { responseType: 'text' });
  }
}
