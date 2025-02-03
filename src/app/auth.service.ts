import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users';

  constructor() {}

  register(user: any) {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  login(credentials: any): boolean {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }
}