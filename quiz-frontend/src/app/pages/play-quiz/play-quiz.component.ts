import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Answer {
    id: number;
    text: string;
    isCorrect: boolean;
    selected?: boolean; 
}

interface Question {
    question: string;
    answers: Answer[];
}

@Component({
    selector: 'app-play-quiz',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './play-quiz.component.html',
    styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  @Input() quizId: number | null = null;
  quizTitle: string = '';
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  userId: number | null = null; // ID de l'utilisateur
  feedback: string[] = [];
  currentQuestion: Question | null = null; // Question actuelle
  quizCompleted: boolean = false; // 🔥 Indique si le quiz est terminé

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.userId = JSON.parse(localStorage.getItem('user') || '{}').id; // Récupération de l'ID de l'utilisateur
      this.quizId = +this.route.snapshot.params['id']; // Conversion en nombre
      this.fetchQuizData();
  }

  fetchQuizData() {
      this.http.get<any>(`http://localhost/quiz-backend/get-quiz.php?id=${this.quizId}`).subscribe({
          next: (response) => {
              this.quizTitle = response.title || 'Quiz Title'; // Assurez-vous que le titre est correctement défini
              this.questions = response.questions || [];
              this.currentQuestion = this.questions[this.currentQuestionIndex]; // Initialiser la question actuelle
          },
          error: (err) => {
              console.error('Erreur lors de la récupération des données du quiz:', err);
              this.quizTitle = 'Erreur lors du chargement du quiz';
              this.questions = [];
          }
      });
  }

  submitAnswers() {
      const currentQuestion = this.questions[this.currentQuestionIndex];

      // Récupérer les réponses sélectionnées par l'utilisateur
      const selectedAnswers = currentQuestion.answers
          .filter((answer: Answer) => answer.selected)
          .map((answer: Answer) => answer.id);

      // Réinitialiser le feedback
      this.feedback = currentQuestion.answers.map(() => '');

      if (this.userId && selectedAnswers.length > 0) {
          selectedAnswers.forEach(answerId => {
              const postData = {
                  user_id: this.userId,
                  reponse_id: answerId
              };

              this.http.post('http://localhost/quiz-backend/submit-answer.php', postData).subscribe({
                  next: (response) => {
                      console.log('Réponse soumise:', response);
                  },
                  error: (err) => {
                      console.error('Erreur lors de la soumission de la réponse:', err);
                  }
              });

              // Colorier la réponse si elle est correcte ou incorrecte
              const answer = currentQuestion.answers.find((a: Answer) => a.id === answerId);
              if (answer) {
                  this.feedback[currentQuestion.answers.indexOf(answer)] = answer.isCorrect ? 'correct' : 'incorrect';
              }
          });
      } else {
          console.error('L\'ID de l\'utilisateur ou les réponses sélectionnées sont manquants.');
      }
  }

  nextQuestion() {
      if (this.currentQuestionIndex + 1 < this.questions.length) {
          // Passer à la question suivante
          this.currentQuestionIndex++;
          this.currentQuestion = this.questions[this.currentQuestionIndex];
          this.feedback = []; // Réinitialiser le feedback
      } else {
          // 🔥 Afficher le message de fin du quiz
          this.quizCompleted = true;
          this.currentQuestion = null; // Désactive l'affichage de la question actuelle
      }
  }
}
