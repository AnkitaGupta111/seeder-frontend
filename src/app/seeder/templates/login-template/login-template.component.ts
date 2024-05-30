import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-login-template',
  standalone: true,
  imports: [MatCard, ReactiveFormsModule, MatButtonModule, SharedModule],
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.css'
})
export class LoginTemplateComponent {

  @Input() imgSrc: string = ""
  @Input() heading: string = ""
  @Input() subheading: string = ""
  @Input() buttonText: string = ""
  @Input() formGroup: FormGroup = new FormGroup({})
  @Input() onButtonClick: () => void = () => { };
  @Input() buttonDisabled: boolean = false

}
