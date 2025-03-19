import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, CommonModule]
})
export class AppComponent implements OnInit {
  userId: number | null = null;
  isLoggedIn: boolean = false; // Variable pour suivre l'état de connexion

  constructor(private notificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
      this.isLoggedIn = true; // L'utilisateur est connecté
      this.listenForNotifications();
    }
  }

  listenForNotifications() {
    setInterval(() => {
      if (this.userId) {
        this.notificationService.getNotifications(this.userId).subscribe((notifications: any) => {
          if (notifications.length > 0) {
            notifications.forEach((notif: any) => {
              this.showBrowserNotification("Nouvelle Notification", notif.message);
            });
          }
        });
      }
    }, 10000); // Vérifie toutes les 10 secondes
  }

  showBrowserNotification(title: string, message: string) {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, { body: message, icon: 'assets/notification-icon.png' });
        }
      });
    }
  }

  // Retour à la page d'accueil
  goToHome() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']); // Assurez-vous que la route "/home" est bien définie
    }
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('user'); // Supprime les données utilisateur
    this.isLoggedIn = false; // Met à jour l'état de connexion
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}
