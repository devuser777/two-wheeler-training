import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'trainingStatus',
    'paymentStatus',
    'actions'
  ];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Dummy user data
  dummyUsers: User[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      dateOfBirth: new Date('1990-01-15'),
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      licenseNumber: 'DL123456',
      trainingStatus: 'in-progress',
      registrationDate: new Date('2024-01-10'),
      emergencyContact: {
        name: 'Jane Doe',
        phone: '987-654-3210',
        relationship: 'Spouse'
      },
      paymentStatus: 'completed'
    },
    {
      id: '2',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      phone: '234-567-8901',
      dateOfBirth: new Date('1995-03-20'),
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001'
      },
      licenseNumber: 'DL789012',
      trainingStatus: 'pending',
      registrationDate: new Date('2024-02-01'),
      emergencyContact: {
        name: 'Bob Smith',
        phone: '876-543-2109',
        relationship: 'Brother'
      },
      paymentStatus: 'pending'
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.j@example.com',
      phone: '345-678-9012',
      dateOfBirth: new Date('1988-07-25'),
      address: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601'
      },
      licenseNumber: 'DL345678',
      trainingStatus: 'completed',
      registrationDate: new Date('2024-01-05'),
      emergencyContact: {
        name: 'Sarah Johnson',
        phone: '765-432-1098',
        relationship: 'Sister'
      },
      paymentStatus: 'completed'
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.b@example.com',
      phone: '456-789-0123',
      dateOfBirth: new Date('1992-11-30'),
      address: {
        street: '321 Elm St',
        city: 'Houston',
        state: 'TX',
        zipCode: '77001'
      },
      licenseNumber: 'DL901234',
      trainingStatus: 'in-progress',
      registrationDate: new Date('2024-01-20'),
      emergencyContact: {
        name: 'David Brown',
        phone: '654-321-0987',
        relationship: 'Father'
      },
      paymentStatus: 'pending'
    }
  ];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Initialize with dummy data instead of API call
    this.initializeDummyData();
  }

  private initializeDummyData() {
    this.dataSource = new MatTableDataSource(this.dummyUsers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Custom sorting for name column
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'name':
          return item.firstName + ' ' + item.lastName;
        default:
          return (item as any)[property];
      }
    };

    // Custom filtering
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const searchStr = filter.toLowerCase();
      return data.firstName.toLowerCase().includes(searchStr) ||
             data.lastName.toLowerCase().includes(searchStr) ||
             data.email.toLowerCase().includes(searchStr) ||
             data.phone.includes(searchStr) ||
             data.trainingStatus.includes(searchStr) ||
             data.paymentStatus.includes(searchStr);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateTrainingStatus(userId: string, status: string) {
    const userIndex = this.dummyUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.dummyUsers[userIndex].trainingStatus = status as 'pending' | 'in-progress' | 'completed';
      this.initializeDummyData();
      this.snackBar.open('Training status updated successfully', 'Close', {
        duration: 3000
      });
    }
  }

  updatePaymentStatus(userId: string, status: string) {
    const userIndex = this.dummyUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      this.dummyUsers[userIndex].paymentStatus = status as 'pending' | 'completed';
      this.initializeDummyData();
      this.snackBar.open('Payment status updated successfully', 'Close', {
        duration: 3000
      });
    }
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      const userIndex = this.dummyUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        this.dummyUsers.splice(userIndex, 1);
        this.initializeDummyData();
        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 3000
        });
      }
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'primary';
      case 'in-progress':
        return 'accent';
      case 'pending':
        return 'warn';
      default:
        return '';
    }
  }
}
