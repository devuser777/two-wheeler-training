import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

interface DashboardStats {
  totalUsers: number;
  pendingTraining: number;
  inProgressTraining: number;
  completedTraining: number;
  pendingPayments: number;
  completedPayments: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalUsers: 0,
    pendingTraining: 0,
    inProgressTraining: 0,
    completedTraining: 0,
    pendingPayments: 0,
    completedPayments: 0
  };

  recentUsers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    //this.loadDashboardData();
  }

  private loadDashboardData() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.calculateStats(users);
        this.recentUsers = users.slice(-5).reverse(); // Get last 5 users
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  private calculateStats(users: User[]) {
    this.stats.totalUsers = users.length;
    this.stats.pendingTraining = users.filter(u => u.trainingStatus === 'pending').length;
    this.stats.inProgressTraining = users.filter(u => u.trainingStatus === 'in-progress').length;
    this.stats.completedTraining = users.filter(u => u.trainingStatus === 'completed').length;
    this.stats.pendingPayments = users.filter(u => u.paymentStatus === 'pending').length;
    this.stats.completedPayments = users.filter(u => u.paymentStatus === 'completed').length;
  }
}
