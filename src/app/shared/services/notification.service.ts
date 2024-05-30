import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(
        private snackbar: MatSnackBar,
    ) { }

    showError(message: string, duration = 5000): void {

        this.snackbar.open(`Error: ${message}`, 'Okay', {
            panelClass: ['error-snack'],
            duration
        });
    }


    showSuccessSnackBar(message: string, duration = 5000) {

        this.snackbar.open(message, 'Okay', {
            panelClass: ['success-snack'],
            duration,
        });
    }
}