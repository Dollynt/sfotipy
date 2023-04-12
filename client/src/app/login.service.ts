import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogged = new BehaviorSubject<boolean>(!!localStorage.getItem('currentUser'));
  private appURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.appURL}/login`, { email, password })
      .pipe(map(response => {
        if (response && response.success) {
          localStorage.setItem('currentUser', JSON.stringify({ email: email, token: response.token, id: response.id }));
        }
        return response;
      }));
  }

  getLoginStatus() {
    return this.isLogged.asObservable();
  }

  updateLoginStatus(newStatus: boolean) {
    this.isLogged.next(newStatus);
  }
}
