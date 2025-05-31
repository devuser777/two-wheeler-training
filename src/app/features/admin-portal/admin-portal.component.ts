import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent implements OnInit {
  trainingStats = {
    pending: 0,
    inProgress: 0,
    completed: 0
  };

  paymentStats = {
    pending: 0,
    completed: 0,
    totalAmount: 0
  };

  searchForm: FormGroup;
  searchResults: User[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['', Validators.required],
      searchType: ['name', Validators.required]
    });
  }

  ngOnInit() {
    //this.loadStatistics();
  }

  private loadStatistics() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.calculateStatistics(users);
      },
      error: (error) => {
        console.error('Error loading statistics:', error);
        this.snackBar.open('Error loading statistics', 'Close', {
          duration: 3000
        });
      }
    });
  }

  private calculateStatistics(users: User[]) {
    // Training statistics
    this.trainingStats.pending = users.filter(u => u.trainingStatus === 'pending').length;
    this.trainingStats.inProgress = users.filter(u => u.trainingStatus === 'in-progress').length;
    this.trainingStats.completed = users.filter(u => u.trainingStatus === 'completed').length;

    // Payment statistics
    this.paymentStats.pending = users.filter(u => u.paymentStatus === 'pending').length;
    this.paymentStats.completed = users.filter(u => u.paymentStatus === 'completed').length;
    // Note: Total amount calculation would require a payment amount field in the user model
  }

  onSearch() {
    if (this.searchForm.valid) {
      const { searchTerm, searchType } = this.searchForm.value;
      
      this.userService.getUsers().subscribe({
        next: (users) => {
          this.searchResults = users.filter(user => {
            if (searchType === 'name') {
              const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
              return fullName.includes(searchTerm.toLowerCase());
            } else if (searchType === 'email') {
              return user.email.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchType === 'phone') {
              return user.phone.includes(searchTerm);
            }
            return false;
          });
        },
        error: (error) => {
          console.error('Error searching users:', error);
          this.snackBar.open('Error searching users', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  clearSearch() {
    this.searchForm.reset({
      searchTerm: '',
      searchType: 'name'
    });
    this.searchResults = [];
  }
}
