import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost/quiz-backend/login.php', this.user).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          console.log('Utilisateur connecté :', response.user);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.router.navigate(['/home']).then(() => {
            window.location.reload(); // 🔥 Recharge automatiquement la page après la redirection
          });
        } else {
          alert(response.message || 'Identifiants incorrects.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la connexion :', err);
        alert('Une erreur est survenue.');
      },
    });
  }

}
