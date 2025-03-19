<?php
// Autoriser les requêtes CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Inclure le fichier de connexion à la base de données
include 'db.php';

$quiz_id = $_GET['id'];
$response = [];

// Vérifiez si l'ID de quiz est valide
if (!isset($quiz_id) || !is_numeric($quiz_id)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid quiz ID']);
    exit;
}

try {
    // Récupérer le titre du quiz
    $stmt = $pdo->prepare("SELECT titre FROM Quiz WHERE Id = ?");
    $stmt->execute([$quiz_id]);
    $quiz = $stmt->fetch(PDO::FETCH_ASSOC);

    // Vérifiez si le quiz a été trouvé
    if (!$quiz) {
        http_response_code(404);
        echo json_encode(['error' => 'Quiz not found']);
        exit;
    }

    // Ajouter le titre du quiz à la réponse
    $response['title'] = $quiz['titre'];

    // Récupérer les questions associées à l'ID du quiz
    $stmt = $pdo->prepare("SELECT id, question_text FROM Question WHERE quiz_id = ?");
    $stmt->execute([$quiz_id]);
    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Vérifier si des questions ont été trouvées
    if ($questions) {
        foreach ($questions as $row) {
            $response['questions'][] = [
                'id' => $row['id'],
                'question' => $row['question_text'],
                'answers' => [] // Initialiser le tableau des réponses
            ];
        }
    } else {
        $response['questions'] = []; // Aucun question
    }

    // Récupérer les réponses associées aux questions
    $stmt = $pdo->prepare("SELECT r.id AS answer_id, r.reponse_text, r.is_correct, r.question_id 
    FROM Reponse r 
    WHERE r.question_id IN (SELECT id FROM Question WHERE quiz_id = ?)");
    $stmt->execute([$quiz_id]);
    $reponses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Ajouter les réponses aux questions
    foreach ($reponses as $row) {
        foreach ($response['questions'] as &$question) {
            if ($question['id'] == $row['question_id']) {
                $question['answers'][] = [
                    'id' => $row['answer_id'],
                    'text' => $row['reponse_text'],
                    'isCorrect' => (bool)$row['is_correct']
                ];
            }
        }
    }

    // Renvoyer la réponse au format JSON
    echo json_encode($response);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>