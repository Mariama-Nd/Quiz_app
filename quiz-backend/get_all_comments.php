<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require 'db.php';

try {
    $query = $pdo->query("
        SELECT c.quiz_title, c.comment, c.created_at, u.username
        FROM comments c
        JOIN User u ON c.user_id = u.id
        ORDER BY c.created_at DESC
    ");
    $comments = $query->fetchAll(PDO::FETCH_ASSOC);

    $groupedComments = [];
    foreach ($comments as $comment) {
        $quizTitle = $comment['quiz_title'];
        if (!isset($groupedComments[$quizTitle])) {
            $groupedComments[$quizTitle] = [
                "quizTitle" => $quizTitle,
                "comments" => []
            ];
        }

        $groupedComments[$quizTitle]["comments"][] = [
            "username" => $comment['username'],
            "comment" => $comment['comment'],
            "created_at" => $comment['created_at']
        ];
    }

    echo json_encode(array_values($groupedComments), JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur SQL: " . $e->getMessage()]);
}
?>
