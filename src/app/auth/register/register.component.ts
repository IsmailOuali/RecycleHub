import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '../../shared/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog // Inject MatDialog
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      photo: [''],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
      this.openConfirmationPopup('Registration successful!');
    }
  }

  openConfirmationPopup(message: string): void {
    this.dialog.open(ConfirmationPopupComponent, {
      width: '300px',
      data: { message },
    });
  }
}