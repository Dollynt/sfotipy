import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [
        LoginComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.LoginForm.valid).toBeFalsy();
  });

  it('form should display an error when empty and submitted', () => {
    const email = component.LoginForm.controls['email'];
    const password = component.LoginForm.controls['senha'];
    component.submit();
    expect(email.errors?.['required']).toBeTruthy();
    expect(password.errors?.['required']).toBeTruthy();
  });

  it('form should be valid when filled with valid values and submitted', () => {
    const email = component.LoginForm.controls['email'];
    const password = component.LoginForm.controls['senha'];
    email.setValue('test@test.com');
    password.setValue('123456');
    component.submit();
    expect(component.submitted).toBeTruthy();
  });

  it('should display error message when login fails', () => {
    const loginServiceSpy = spyOn(TestBed.inject(LoginService), 'login').and.returnValue(
      of({ success: false })
    );
    const email = component.LoginForm.controls['email'];
    const password = component.LoginForm.controls['senha'];
    email.setValue('test@test.com');
    password.setValue('123456');
    component.submit();
    expect(component.erro_servidor).toBeFalsy();
  });

  it('should redirect user to home page after successful login', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    const loginServiceSpy = spyOn(TestBed.inject(LoginService), 'login').and.returnValue(
      of({ success: true, email: 'angel@gmail.com', token: 'token', id: 'id' })
    );
    const email = component.LoginForm.controls['email'];
    const password = component.LoginForm.controls['senha'];
    email.setValue('angel@gmail.com');
    password.setValue('1234');
    component.submit();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });

  it('should redirect to home page if user is already logged and tries do get into /login', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    localStorage.setItem('token', '1234567890');
    const loginServiceSpy = spyOn(TestBed.inject(LoginService), 'getLoginStatus').and.returnValue(of(true));
    component.checkToken();
    expect(routerSpy).toHaveBeenCalledWith(['']);
    localStorage.removeItem('token');
  });

});
