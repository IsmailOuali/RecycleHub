import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-request-form',
  standalone: false,
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
export class RequestFormComponent {
  requestForm: FormGroup;

  constructor(private fb: FormBuilder, private collectionService: CollectionService) {
    this.requestForm = this.fb.group({
      wasteType: ['', Validators.required],
      photos: [''], // Optional field
      weight: [null, [Validators.required, Validators.min(1000)]], // Minimum 1000g
      address: ['', Validators.required],
      dateTime: ['', Validators.required],
      notes: [''], // Optional field
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      try {
        this.collectionService.submitRequest(this.requestForm.value);
        alert('Request submitted successfully!');
      } catch (error: any) {
        alert(error.message); // Display validation errors
      }
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}