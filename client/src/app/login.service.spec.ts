import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the current value of isLogged BehaviorSubject', () => {
    const loginService = TestBed.inject(LoginService);

    const isLoggedValue = loginService.getLoginStatus().subscribe((value) => {
      expect(value).toBe(true); // assuming localStorage doesn't have 'currentUser' key
    });
  });

  it('should update the value of isLogged BehaviorSubject', () => {
    const loginService = TestBed.inject(LoginService);

    loginService.updateLoginStatus(true);

    const isLoggedValue = loginService.getLoginStatus().subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should make a HTTP POST call with provided email and password', () => {
    const httpSpy = spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(of({ success: true }));
    const loginService = TestBed.inject(LoginService);

    const email = 'test@gmail.com';
    const password = '123456';

    loginService.login(email, password).subscribe();

    expect(httpSpy).toHaveBeenCalledWith('http://localhost:3000/login', { email, password });
  });

  it('should return the server response if login is successful', () => {
    spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(of({ success: true }));
    const loginService = TestBed.inject(LoginService);

    const email = 'test@gmail.com';
    const password = '123456';

    loginService.login(email, password).subscribe((response) => {
      expect(response.success).toBe(true);
    });
  });
});
