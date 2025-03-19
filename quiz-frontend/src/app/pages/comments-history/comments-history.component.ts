import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface CommentDetails {
  quizTitle: string;
  comments: {
    username: string;
    comment: string;
    created_at: string;
  }[];
}

@Component({
  selector: 'app-comments-history',
  standalone: true,
  templateUrl: './comments-history.component.html',
  styleUrls: ['./comments-history.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CommentsHistoryComponent implements OnInit {
  commentsData: CommentDetails[] = [];
  filteredComments: CommentDetails[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAllComments();
  }

  getAllComments() {
    this.http.get<CommentDetails[]>('http://localhost/quiz-backend/get_all_comments.php')
      .subscribe({
        next: (data) => {
          this.commentsData = data;
          this.filteredComments = data;
        },
        error: (err) => console.error('Erreur API Historique Commentaires:', err)
      });
  }

  filterComments() {
    if (!this.searchTerm) {
      this.filteredComments = this.commentsData;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();

    this.filteredComments = this.commentsData
      .map(quiz => ({
        quizTitle: quiz.quizTitle,
        comments: quiz.comments.filter(c =>
          quiz.quizTitle.toLowerCase().includes(searchLower) ||
          c.username.toLowerCase().includes(searchLower) ||
          c.comment.toLowerCase().includes(searchLower)
        )
      }))
      .filter(quiz => quiz.comments.length > 0);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
