import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../collection.service';

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
      weight: [null, [Validators.required, Validators.min(1000)]],
      address: ['', Validators.required],
      date: ['', Validators.required],
      notes: [''],
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      this.collectionService.submitRequest(this.requestForm.value);
    }
  }
}