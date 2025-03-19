<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['title']) || empty($data['description']) || empty($data['user_id'])) {
            echo json_encode(['status' => 'error', 'message' => 'Titre, description et utilisateur obligatoires.']);
            exit;
        }

        $title = htmlspecialchars($data['title']);
        $description = htmlspecialchars($data['description']);
        $user_id = (int) $data['user_id']; // Cast pour sécuriser l'entrée

        // Insérer le quiz
        $stmt = $pdo->prepare("INSERT INTO Quiz (titre, description, user_id, created_at) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$title, $description, $user_id]);
        $quiz_id = $pdo->lastInsertId();

        // Insérer les questions
        if (!empty($data['questions'])) {
            $stmt = $pdo->prepare("INSERT INTO Question (question_text, quiz_id, created_at) VALUES (?, ?, NOW())");
            foreach ($data['questions'] as $question_text) {
                $stmt->execute([htmlspecialchars($question_text), $quiz_id]);
            }
        }

        // Récupérer les questions du quiz
        $stmtFetchQuestions = $pdo->prepare("SELECT id, question_text FROM Question WHERE quiz_id = ?");
        $stmtFetchQuestions->execute([$quiz_id]);
        $questionsList = $stmtFetchQuestions->fetchAll(PDO::FETCH_ASSOC);

        // Log des questions récupérées pour le débogage
        error_log(json_encode($questionsList)); // Ajoutez cette ligne pour le débogage

        echo json_encode(['status' => 'success', 'quiz_id' => $quiz_id, 'questions' => $questionsList]);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Méthode non autorisée.']);
}
?>