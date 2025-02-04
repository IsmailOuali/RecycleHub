import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  standalone: false,
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css'],
})
export class ConfirmationPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}