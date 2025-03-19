import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface QuizDetails {
  quizTitle: string;
  questions: {
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DetailsComponent implements OnInit {
  userId: number | null = null;
  quizzes: QuizDetails[] = [];
  filteredQuizzes: QuizDetails[] = [];
  searchTerm: string = '';

  showCommentPopup: boolean = false;
  selectedQuizTitle: string = '';
  commentText: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
    } else {
      console.error("Utilisateur non trouvé dans le localStorage");
      return;
    }

    this.getUserQuizDetails();
  }

  getUserQuizDetails() {
    if (!this.userId) return;

    this.http.get<QuizDetails[]>(`http://localhost/quiz-backend/user_quiz_details.php?user_id=${this.userId}`)
      .subscribe({
        next: (data) => {
          this.quizzes = data;
          this.filteredQuizzes = data;
        },
        error: (err) => console.error('Erreur API Détails Quiz:', err)
      });
  }

  filterResults() {
    if (!this.searchTerm) {
      this.filteredQuizzes = this.quizzes;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();

    this.filteredQuizzes = this.quizzes
      .map(quiz => ({
        quizTitle: quiz.quizTitle,
        questions: quiz.questions.filter(q =>
          q.questionText.toLowerCase().includes(searchLower) ||
          quiz.quizTitle.toLowerCase().includes(searchLower)
        )
      }))
      .filter(quiz => quiz.questions.length > 0);
  }

  matchesSearch(text: string | null | undefined): boolean {
    return text && this.searchTerm ? text.toLowerCase().includes(this.searchTerm.toLowerCase()) : false;
  }

  openCommentPopup(quizTitle: string) {
    this.selectedQuizTitle = quizTitle;
    this.showCommentPopup = true;
  }

  closeCommentPopup() {
    this.showCommentPopup = false;
    this.commentText = '';
  }

  submitComment() {
    if (!this.commentText.trim()) {
      alert('❌ Le commentaire ne peut pas être vide.');
      return;
    }

    const payload = {
      user_id: this.userId,
      quiz_title: this.selectedQuizTitle,
      comment: this.commentText
    };

    this.http.post('http://localhost/quiz-backend/create_comment.php', payload)
      .subscribe({
        next: () => {
          alert('✅ Commentaire ajouté avec succès !');
          this.closeCommentPopup();
        },
        error: (err) => console.error('❌ Erreur lors de l\'ajout du commentaire:', err)
      });
  }

  goback() {
    this.router.navigate(['/statistics']);
  }
}
