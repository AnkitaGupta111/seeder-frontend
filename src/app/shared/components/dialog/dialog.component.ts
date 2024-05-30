import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface DialogData {
  placeholder: string;
  title: string;
  subheading: string;
  label: string;
  submitButtonText: string;
  closeButtonText: string;
  errorMsg: string;
  onCloseClick: () => {};
  onSubmitClick: (input: string | null) => {}
}


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  input = new FormControl("", Validators.required)

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
