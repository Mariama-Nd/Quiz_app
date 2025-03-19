import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // Correction : styleUrls au lieu de styleUrl
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost/quiz-backend/register.php', this.user, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          alert('Inscription réussie !');
          this.router.navigate(['/login']);
        } else {
          alert(response.message || 'Une erreur est survenue.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription :', err);
        alert('Une erreur est survenue.');
      },
    });
  }

}
