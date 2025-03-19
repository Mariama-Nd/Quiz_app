<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'db.php';

// Récupérer user_id et la page demandée
$user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10; // Nombre de quiz par page
$offset = ($page - 1) * $limit;

if ($user_id > 0) {
    // Récupérer le nombre total de quiz non participés
    $stmt = $pdo->prepare("
        SELECT COUNT(*) as total
        FROM Quiz q 
        WHERE q.id NOT IN (
            SELECT DISTINCT qu.quiz_id  
            FROM Question qu
            JOIN Reponse rp ON qu.id = rp.question_id 
            JOIN Reponse_Question rq ON rp.id = rq.reponse_id
            WHERE rq.user_id = ?
        )
    ");
    $stmt->execute([$user_id]);
    $totalQuizzes = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Récupérer les quiz non participés avec pagination
    $stmt = $pdo->prepare("
        SELECT q.id, q.titre 
        FROM Quiz q 
        WHERE q.id NOT IN (
            SELECT DISTINCT qu.quiz_id  
            FROM Question qu
            JOIN Reponse rp ON qu.id = rp.question_id 
            JOIN Reponse_Question rq ON rp.id = rq.reponse_id
            WHERE rq.user_id = ?
        )
        ORDER BY q.created_at DESC
        LIMIT ? OFFSET ?
    ");
    $stmt->bindParam(1, $user_id, PDO::PARAM_INT);
    $stmt->bindParam(2, $limit, PDO::PARAM_INT);
    $stmt->bindParam(3, $offset, PDO::PARAM_INT);
    $stmt->execute();
    $notParticipatedQuizzes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'quizzes' => $notParticipatedQuizzes,
        'total' => $totalQuizzes,
        'limit' => $limit,
        'current_page' => $page,
        'total_pages' => ceil($totalQuizzes / $limit),
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User ID manquant.']);
}
?>
