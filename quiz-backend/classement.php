<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include 'db.php';

$query = $pdo->prepare("
    SELECT u.username, COUNT(rq.id) AS score
    FROM User u
    LEFT JOIN Reponse_Question rq ON u.id = rq.user_id
    LEFT JOIN Reponse r ON rq.reponse_id = r.id
    WHERE r.is_correct = 1
    GROUP BY u.id
    ORDER BY score DESC
");

$query->execute();
$classement = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($classement);
?>
