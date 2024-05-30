import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from '../../services/user.service';
import { Router, provideRouter } from '@angular/router';
import { ERROR_MESSAGE_MAP } from '../../error.message';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../../shared/services/http/auth.service';


describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceLoginSpy: any;
  let routerSpy: any;
  let userServiceGetUserSpy: any

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule
      ],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['login']) },
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['getUser']) },
      ]
    })
      .compileComponents();


    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;

    authServiceLoginSpy = TestBed.inject(AuthService)
    routerSpy = spyOn(TestBed.inject(Router), "navigate")

    userServiceGetUserSpy = TestBed.inject(UserService)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('email')?.value).toBeNull();
    expect(component.formGroup.get('password')?.value).toBeNull();
  });

  it('should display validation error messages', () => {
    const nameControl = component.formGroup.get('email');
    nameControl?.setValue('');
    nameControl?.markAsTouched();
    fixture.detectChanges();
    const errorMessage = component.getErrorMessage('email');
    expect(errorMessage).toBe(ERROR_MESSAGE_MAP['email']['required']);
  });

  it('should handle login error and display error message', fakeAsync(() => {
    const errorObject = { error: { message: 'Invalid credentials' } };
    authServiceLoginSpy.login.and.returnValue(throwError(() => errorObject));

    try {
      component.onLogin();
      tick()
    } catch (err) {
      expect(err).toEqual(errorObject);
    }

    expect(component.responseError).toEqual('Invalid credentials');

  }));

  it('should reset responseError on form value changes', () => {
    component.responseError = 'Initial error';
    fixture.detectChanges();

    // Trigger form value change
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
    emailInput.value = 'newemail@example.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.responseError).toBeNull();
  });

  it('should call onLogin when the button is clicked', () => {
    authServiceLoginSpy.login.and.returnValue(of({}));

    const button = fixture.debugElement.query(By.css('button[mat-flat-button]')).nativeElement;

    button.dispatchEvent(new Event('click'))

    fixture.detectChanges();

    expect(authServiceLoginSpy.login).toHaveBeenCalled();
  });


  it('should navigate to home on successful login', () => {
    authServiceLoginSpy.login.and.returnValue(of({}));

    component.onLogin();
    fixture.detectChanges();

    expect(userServiceGetUserSpy.getUser).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['home']);
  });
});
