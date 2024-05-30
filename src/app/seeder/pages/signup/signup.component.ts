import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { LoginTemplateComponent } from '../../templates/login-template/login-template.component';
import { MatIconModule } from '@angular/material/icon';
import { ERROR_MESSAGE_MAP } from '../../error.message';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, LoginTemplateComponent, MatButtonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  hide = true;
  formGroup: FormGroup;
  responseError: string | null = null;
  heading: string = "Sign Up ✨"
  imgSrc = "assets/images/signup.svg"
  buttonText = "Sign Up"


  constructor(private userService: UserService, private router: Router, private notificationService: NotificationService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(() => {
      if (this.responseError) {
        this.responseError = null
      }
    })
    this.onSignUp = this.onSignUp.bind(this)
  }


  onSignUp() {
    this.userService.signUp({ ...this.formGroup.value })
      .subscribe({
        next: () => {
          this.notificationService.showSuccessSnackBar("Signed Up Successfully!")
          this.router.navigate(["login"]);
        },
        error: (err) => {
          this.responseError = err?.error.message || err.message
          throw err
        }
      })
  }

  getErrorMessage(formControlName: string) {
    return ERROR_MESSAGE_MAP[formControlName][Object.keys(this.formGroup.get(formControlName)?.errors || {})[0]] || ""
  }
}
