import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]]
      }),
      licenseNumber: [''],
      emergencyContact: this.fb.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        relationship: ['', [Validators.required]]
      })
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData: User = {
        ...this.registrationForm.value,
        registrationDate: new Date(),
        trainingStatus: 'pending',
        paymentStatus: 'pending'
      };

      this.userService.createUser(userData).subscribe({
        next: () => {
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.snackBar.open('Registration failed. Please try again.', 'Close', {
            duration: 3000
          });
          console.error('Registration error:', error);
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000
      });
    }
  }
}
