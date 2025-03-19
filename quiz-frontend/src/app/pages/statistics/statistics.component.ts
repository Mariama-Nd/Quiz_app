import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
interface Statistique {
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
}

interface Classement {
  username: string;
  score: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports:[CommonModule]
})
export class StatisticsComponent implements OnInit {
  statistiques: Statistique | null = null;
  classement: Classement[] = [];
  currentUsername: string | null = null;
  userId: number | null = null;
  chartType: string = 'doughnut';
  username: string | null = null ;
  chartInstance: Chart | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
      this.username = user.username;
      this.currentUsername = user.username;
    } else {
      console.error("Utilisateur non trouvé dans le localStorage");
      return;
    }

    this.getUserStatistics();
    this.getClassement();
  }

  getUserStatistics() {
    if (!this.userId) return;

    this.http.get<Statistique>(`http://localhost/quiz-backend/user_statistics.php?user_id=${this.userId}`)
      .subscribe({
        next: (data) => {
          this.statistiques = data;
          this.createChart();
        },
        error: (err) => console.error('Erreur API Statistiques:', err)
      });
  }

  getClassement() {
    this.http.get<Classement[]>('http://localhost/quiz-backend/classement.php')
      .subscribe({
        next: (data) => {
          this.classement = data;
        },
        error: (err) => console.error('Erreur API Classement:', err)
      });
  }

  createChart() {
    if (!this.statistiques) return;

    const ctx = document.getElementById('quizChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas introuvable');
      return;
    }

    if (this.chartInstance) this.chartInstance.destroy();

    this.chartInstance = new Chart(ctx, {
      type: this.chartType as any,
      data: {
        labels: ['Réponses Correctes', 'Réponses Erronées'],
        datasets: [{
          data: [this.statistiques.correctAnswers, this.statistiques.wrongAnswers],
          backgroundColor: ['#28a745', '#dc3545']
        }]
      }
    });
  }

  changeGraphType(event: any) {
    this.chartType = event.target.value;
    this.createChart();
  }

  voirDetails() {
    this.router.navigate(['/details']);
  }
}
