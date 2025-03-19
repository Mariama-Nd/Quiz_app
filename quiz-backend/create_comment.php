<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require 'db.php';

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data || !isset($data['user_id']) || !isset($data['quiz_title']) || !isset($data['comment'])) {
    echo json_encode(["error" => "Données invalides"]);
    exit;
}

$userId = intval($data['user_id']);
$quizTitle = trim($data['quiz_title']);
$comment = trim($data['comment']);

try {
    $query = $pdo->prepare("INSERT INTO comments (user_id, quiz_title, comment) VALUES (?, ?, ?)");
    $query->execute([$userId, $quizTitle, $comment]);

    echo json_encode(["success" => "Commentaire enregistré"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur SQL: " . $e->getMessage()]);
}
?>
