import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersKey = 'users'; // Key for storing users in local storage

  constructor() {}

  register(user: any) {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    users.push(user); // Add the new user to the list
    localStorage.setItem(this.usersKey, JSON.stringify(users)); // Save back to local storage
  }

  login(credentials: any): boolean {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user)); // Store the logged-in user
      console.log('User logged in:', user); // Debugging log
      return true;
    }
    console.log('Login failed: Invalid credentials'); // Debugging log
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser'); // Clear the logged-in user
  }
}