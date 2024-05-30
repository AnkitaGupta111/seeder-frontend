import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ERROR_MESSAGE_MAP } from '../../error.message';
import { AuthService } from '../../../shared/services/http/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { LoginTemplateComponent } from '../../templates/login-template/login-template.component';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, LoginTemplateComponent, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hide = true;
  formGroup: FormGroup;
  responseError: string | null = null;
  heading: string = "Login to Seeder ✨"
  subheading: string = "Enter your mail id and password to login"
  imgSrc = "assets/images/login.png"
  buttonText = "Continue"

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(() => {
      if (!!this.responseError) {
        this.responseError = null
      }
    })
    this.onLogin = this.onLogin.bind(this)
  }


  onLogin() {
    this.auth.login({ ...this.formGroup.value })
      .subscribe({
        next: () => {
          this.userService.getUser()
          this.router.navigate(["home"]);
        },
        error: (err) => {
          this.responseError = err.error?.message || 'Invalid credentials'
          throw err
        }
      })
  }

  getErrorMessage(formControlName: string) {
    return ERROR_MESSAGE_MAP[formControlName][Object.keys(this.formGroup.get(formControlName)?.errors || {})[0]] || ""
  }


}
