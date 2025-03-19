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

$query = $pdo->prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 10");
$query->execute([$userId]);
$notifications = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notifications);
?>
