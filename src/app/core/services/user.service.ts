import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Get user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Create new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update user
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Delete user
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get users by training status
  getUsersByStatus(status: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?status=${status}`);
  }

  // Update training status
  updateTrainingStatus(id: string, status: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/status`, { status });
  }

  // Update payment status
  updatePaymentStatus(id: string, status: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/payment`, { status });
  }
}
