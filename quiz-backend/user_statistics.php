<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include 'db.php'; 

$userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($userId <= 0) {
    echo json_encode(["error" => "ID utilisateur invalide"]);
    exit;
}

$query = $pdo->prepare("
    SELECT 
        (SELECT COUNT(DISTINCT quiz_id) FROM Reponse_Question rq 
         JOIN Reponse r ON rq.reponse_id = r.id 
         JOIN Question q ON r.question_id = q.id WHERE rq.user_id = ?) AS totalQuizzes,
        
        (SELECT COUNT(*) FROM Reponse_Question WHERE user_id = ?) AS totalQuestions,

        (SELECT COUNT(*) FROM Reponse_Question rq
         JOIN Reponse r ON rq.reponse_id = r.id 
         WHERE rq.user_id = ? AND r.is_correct = 1) AS correctAnswers,

        (SELECT COUNT(*) FROM Reponse_Question rq
         JOIN Reponse r ON rq.reponse_id = r.id 
         WHERE rq.user_id = ? AND r.is_correct = 0) AS wrongAnswers
");

$query->execute([$userId, $userId, $userId, $userId]);
$stats = $query->fetch(PDO::FETCH_ASSOC);

if (!$stats) {
    echo json_encode(["error" => "Aucune donnée trouvée"]);
    exit;
}

echo json_encode($stats);
?>

