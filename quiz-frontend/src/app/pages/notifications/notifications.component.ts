import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [CommonModule, HttpClientModule],
  providers: [NotificationService],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  userId: number | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
      this.loadNotifications();
    }
  }

  loadNotifications() {
    if (this.userId) {
      this.notificationService.getNotifications(this.userId).subscribe((data: any) => {
        this.notifications = data;
      });
    }
  }
}
