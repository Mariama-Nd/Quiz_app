import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  sendNotification(userId: number, message: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ user_id: userId, message: message });

    return this.http.post('http://localhost/quiz-backend/create_notification.php', body, { headers });
  }

  // Récupérer les notifications d'un utilisateur
  getNotifications(userId: number): Observable<any> {
    return this.http.get(`http://localhost/quiz-backend/get_notifications.php?user_id=${userId}`);
  }

  // Afficher une notification via le navigateur
  showBrowserNotification(title: string, message: string) {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification(title, { body: message, icon: 'assets/notification-icon.png' });
        }
      });
    }
  }
}

