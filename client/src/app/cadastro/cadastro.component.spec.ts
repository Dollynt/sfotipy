import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CustomvalidationService } from './Validators_extras';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [
        RegisterComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home page if user is already logged in', () => {
    spyOn(component.loginService, 'getLoginStatus').and.returnValue(of(true));
    spyOn(component.router, 'navigate');
    component.ngOnInit();
    expect(component.router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should display an error when the form is empty and submitted', () => {
    component.RegisterForm.setValue({ email: '', senha: '', ConfirmarSenha: '', nome: '' });
    component.submit();
    expect(component.RegisterForm.controls['email'].errors?.['required']).toBeTruthy();
    expect(component.RegisterForm.controls['senha'].errors?.['required']).toBeTruthy();
    expect(component.RegisterForm.controls['ConfirmarSenha'].errors?.['required']).toBeTruthy();
    expect(component.RegisterForm.controls['nome'].errors?.['required']).toBeTruthy();
  });

  it('should display an error when the email is invalid', () => {
    component.RegisterForm.setValue({ email: 'invalid_email', senha: '', ConfirmarSenha: '', nome: '' });
    component.submit();
    expect(component.RegisterForm.controls['email'].errors?.['email']).toBeTruthy();
    component.RegisterForm.setValue({ email: 'valid_email@test.com', senha: '', ConfirmarSenha: '', nome: '' });
    expect(component.RegisterForm.controls['email'].errors).toBeNull();
  });

  it('should display an error when the password is invalid', () => {
    component.RegisterForm.setValue({ email: '', senha: 'kindashorthighterweapon', ConfirmarSenha: 'kindashorthighterweapon', nome: '' });
    component.submit();
    expect(component.RegisterForm.controls['senha'].errors?.['maxlength']).toBeTruthy();
    expect(component.RegisterForm.controls['ConfirmarSenha'].errors).toBeNull();
  });

  it('should not display an error when password and MatchPassword are the same', () => {
    component.RegisterForm.setValue({ email: '', senha: 'password', ConfirmarSenha: 'password', nome: '' });
    component.submit();
    expect(component.RegisterForm.controls['ConfirmarSenha'].errors).toBeNull();
  });

  it('should display an error when the name is invalid', () => {
    component.RegisterForm.setValue({ email: '', senha: '', ConfirmarSenha: '', nome: 'invalid_name_with_very_long_text' });
    component.submit();
    expect(component.RegisterForm.controls['nome'].hasError('maxlength')).toBeTruthy();

    component.RegisterForm.setValue({ email: '', senha: '', ConfirmarSenha: '', nome: 'valid_name' });
    expect(component.RegisterForm.controls['nome'].hasError('maxlength')).toBeFalsy();
  });

  it('should redirect the user to main page after register himself', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');

    const component = fixture.componentInstance;
    component.RegisterForm.setValue({
      email: 'test@gmail.com',
      senha: '123456',
      ConfirmarSenha: '123456',
      nome: 'Test User'
    });
    component.submit();
    component.redirectToHomePage();
    expect(routerSpy).toHaveBeenCalledWith(['']);
    localStorage.removeItem('token')
  });
});