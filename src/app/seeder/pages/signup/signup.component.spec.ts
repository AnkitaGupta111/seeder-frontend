import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Router, provideRouter } from '@angular/router';
import { ERROR_MESSAGE_MAP } from '../../error.message';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userServiceSignupSpy: any;
  let notificationServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
        BrowserAnimationsModule
      ],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['signUp']) },
        { provide: NotificationService, useValue: jasmine.createSpyObj('NotificationService', ['showSuccessSnackBar']) },

      ]
    })
      .compileComponents();


    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.debugElement.componentInstance;

    userServiceSignupSpy = TestBed.inject(UserService)
    notificationServiceSpy = TestBed.inject(NotificationService)
    routerSpy = spyOn(TestBed.inject(Router), "navigate")


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('name')?.value).toBeNull();
    expect(component.formGroup.get('email')?.value).toBeNull();
    expect(component.formGroup.get('password')?.value).toBeNull();
  });

  it('should display validation error messages', () => {
    const nameControl = component.formGroup.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();
    fixture.detectChanges();
    const errorMessage = component.getErrorMessage('name');
    expect(errorMessage).toBe(ERROR_MESSAGE_MAP['name']['required']);
  });

  it('should call signUp method and navigate to login on success', () => {
    userServiceSignupSpy.signUp.and.returnValue(of({}));
    routerSpy.and.returnValue("");
    component.formGroup.setValue({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' });
    component.onSignUp();
    expect(userServiceSignupSpy.signUp).toHaveBeenCalledWith({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' });
    expect(notificationServiceSpy.showSuccessSnackBar).toHaveBeenCalledWith('Signed Up Successfully!');
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  });

  it('should set responseError on signup error', fakeAsync(() => {
    const errorResponse = { error: { message: 'Signup failed' } };
    userServiceSignupSpy.signUp.and.returnValue(throwError(() => errorResponse))
    component.formGroup.setValue({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' });
    try {
      component.onSignUp();
      tick();
    } catch (err) {
      expect(err).toEqual(errorResponse);
    }
    expect(component.responseError).toBe('Signup failed');
  }));



  it('should render form fields correctly', () => {
    const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should show error messages when form is invalid', () => {
    const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]')).nativeElement;
    nameInput.value = ""

    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur')); //losing focus
    fixture.detectChanges();

    const nameError = fixture.debugElement.query(By.css('mat-error'));
    expect(nameError.nativeElement.textContent).toContain(ERROR_MESSAGE_MAP['name']['required']);

  });


  it('should call onSignUp when the button is clicked', () => {
    userServiceSignupSpy.signUp.and.returnValue(of({}));

    const button = fixture.debugElement.query(By.css('button[mat-flat-button]')).nativeElement;
    button.dispatchEvent(new Event('click'))

    expect(userServiceSignupSpy.signUp).toHaveBeenCalled();
  });

  it('should reset responseError on form value changes', () => {
    component.responseError = 'Initial error';
    fixture.detectChanges();

    // Trigger form value change
    const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]')).nativeElement;
    nameInput.value = 'New Name';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.responseError).toBeNull();
  });


  it('should disable submit button if there is a response error', () => {
    component.responseError = 'Some error';
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[mat-flat-button]')).nativeElement;
    expect(submitButton.disabled).toBeTrue();
  });

});
