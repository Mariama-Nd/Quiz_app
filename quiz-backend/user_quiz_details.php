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
    SELECT q.titre AS quizTitle, que.question_text, r.reponse_text AS userAnswer,
           (SELECT reponse_text FROM Reponse WHERE question_id = que.id AND is_correct = 1) AS correctAnswer,
           r.is_correct
    FROM Reponse_Question rq
    JOIN Reponse r ON rq.reponse_id = r.id
    JOIN Question que ON r.question_id = que.id
    JOIN Quiz q ON que.quiz_id = q.id
    WHERE rq.user_id = ?
    ORDER BY q.titre, que.id
");

$query->execute([$userId]);
$rows = $query->fetchAll(PDO::FETCH_ASSOC);

$result = [];
foreach ($rows as $row) {
    $quizTitle = $row['quizTitle'];
    if (!isset($result[$quizTitle])) {
        $result[$quizTitle] = ['quizTitle' => $quizTitle, 'questions' => []];
    }
    $result[$quizTitle]['questions'][] = [
        'questionText' => $row['question_text'],
        'userAnswer' => $row['userAnswer'],
        'correctAnswer' => $row['correctAnswer'],
        'isCorrect' => (bool) $row['is_correct']
    ];
}

echo json_encode(array_values($result));
?>
