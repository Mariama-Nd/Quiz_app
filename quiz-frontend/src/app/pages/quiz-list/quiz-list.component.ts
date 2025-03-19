import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
})
export class QuizListComponent implements OnInit {
  userId: number | null = null;
  notParticipatedQuizzes: any[] = [];
  filteredQuizzes: any[] = [];

  // Pagination
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userId = parsedUser.id;
      this.fetchNotParticipatedQuizzes();
    }
  }

  fetchNotParticipatedQuizzes(page: number = 1) {
    if (!this.userId) return;

    this.http.get<any>(`http://localhost/quiz-backend/get-not-participated-quizzes.php?user_id=${this.userId}&page=${page}`)
      .subscribe({
        next: (response) => {
          this.notParticipatedQuizzes = response.quizzes || [];
          this.filteredQuizzes = this.notParticipatedQuizzes;
          this.currentPage = response.current_page;
          this.totalPages = response.total_pages;
        },
        error: (err) => console.error('Erreur lors de la récupération des quiz non participés :', err),
      });
  }

  filterQuizzes(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();

    if (!searchTerm) {
      this.filteredQuizzes = this.notParticipatedQuizzes;
      return;
    }

    this.filteredQuizzes = this.notParticipatedQuizzes.filter(quiz =>
      quiz.titre.toLowerCase().includes(searchTerm)
    );
  }

  participate(quizId: number) {
    this.router.navigate(['/play-quiz', quizId]);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.fetchNotParticipatedQuizzes(page);
    }
  }
}
