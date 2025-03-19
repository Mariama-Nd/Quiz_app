import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent {
  quiz = {
    title: '',
    description: '',
  };

  questions = [{ text: '' }];
  userId: number | null = null;
  quizId: number | null = null;

  showCreateQuiz = true;
  showAddResponses = false;

  responses = [{ text: '', isCorrect: false }];
  questionList: { id: number; question_text: string }[] = [];
  selectedQuestionId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userId = parsedUser.id;
    }
  }

  addQuestion() {
    this.questions.push({ text: '' });
  }

  createQuiz() {
    if (!this.userId) {
      alert("Erreur : utilisateur non identifié.");
      return;
    }

    const payload = {
      title: this.quiz.title,
      description: this.quiz.description,
      user_id: this.userId,
      questions: this.questions.map((q) => q.text).filter((text) => text.trim() !== ''),
    };

    console.log("🔍 Envoi du quiz :", payload);

    this.http.post('http://localhost/quiz-backend/create-quiz.php', payload).subscribe({
      next: (response: any) => {
        console.log('✅ Réponse du backend (Quiz) :', response);

        if (response.status === 'success') {
          this.quizId = response.quiz_id;
          this.questionList = response.questions;
          console.log('📌 Liste des questions récupérées :', this.questionList);

          if (this.questionList.length === 0) {
            alert('⚠️ Aucune question ajoutée. Vérifiez vos entrées.');
          } else {
            alert('🎉 Quiz créé avec succès !');
            this.showCreateQuiz = false;
            this.showAddResponses = true;

            // 🔥 Envoyer une notification à tous les utilisateurs sauf le créateur
            this.sendNotificationToAllUsers(`Un nouveau quiz : "${this.quiz.title}" a ete ajouté !`);
          }
        } else {
          alert(response.message || '❌ Une erreur est survenue.');
        }
      },
      error: (err) => {
        console.error('❌ Erreur lors de la création du quiz :', err);
        alert("Erreur lors de la création du quiz. Veuillez réessayer.");
      },
    });
  }

  sendNotificationToAllUsers(message: string) {
    console.log("🔔 Envoi des notifications aux utilisateurs...");

    this.http.get('http://localhost/quiz-backend/get_all_users.php').subscribe({
      next: (response: any) => {
        console.log("👥 Réponse brute de l'API :", response);

        if (!Array.isArray(response)) {
          console.error("❌ Erreur: la réponse API n'est pas un tableau !");
          return;
        }

        response.forEach((user: any) => {
          if (user.id !== this.userId) {
            const notificationPayload = {
              user_id: user.id,
              message
            };

            console.log(`📩 Envoi de la notification à ${user.id}`);

            this.http.post("http://localhost/quiz-backend/create_notification.php", notificationPayload, {
              headers: { "Content-Type": "application/json" }
            }).subscribe({
              next: (res) => {
                console.log("✅ Notification enregistrée :", res);

                // 🔥 Afficher la notification sur la machine
                this.showBrowserNotification(message);
              },
              error: (err) => {
                console.error("❌ Erreur d'enregistrement :", err);
              }
            });
          }
        });
      },
      error: (err) => console.error("❌ Erreur lors de la récupération des utilisateurs :", err)
    });
  }


  addResponseField() {
    this.responses.push({ text: '', isCorrect: false });
  }

  saveResponses() {
    if (!this.selectedQuestionId) {
      alert('❌ Veuillez sélectionner une question.');
      return;
    }

    const payload = {
      question_id: this.selectedQuestionId,
      responses: this.responses.map(response => ({
        text: response.text,
        isCorrect: response.isCorrect,
      })),
    };

    console.log("📝 Enregistrement des réponses :", payload);

    this.http.post('http://localhost/quiz-backend/add-responses.php', payload).subscribe({
      next: (response: any) => {
        console.log("✅ Réponse du backend (Réponses) :", response);
        if (response.status === 'success') {
          alert('✅ Réponses ajoutées avec succès !');
          this.responses = [{ text: '', isCorrect: false }];
        } else {
          alert(response.message || '❌ Une erreur est survenue.');
        }
      },
      error: (err) => {
        console.error('❌ Erreur lors de l\'enregistrement des réponses :', err);
        alert('Erreur lors de l\'enregistrement des réponses.');
      },
    });
  }

  showBrowserNotification(message: string) {
    if (!("Notification" in window)) {
      console.error("❌ Les notifications ne sont pas supportées par ce navigateur.");
      return;
    }

    // 🔥 Demander la permission d'afficher les notifications
    if (Notification.permission === "granted") {
      new Notification("📢 Nouvelle Notification", { body: message });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("📢 Nouvelle Notification", { body: message });
        }
      });
    }
  }

}
