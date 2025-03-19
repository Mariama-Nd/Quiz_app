<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// 🔥 Gérer la requête Preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

// 🔥 Lire les données envoyées
$rawData = file_get_contents("php://input");
$cleanData = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $rawData);
$data = json_decode($cleanData, true);

error_log("Données brutes reçues : " . $rawData);
error_log("Données après nettoyage : " . json_encode($data));

if (!$data) {
    echo json_encode(["error" => "Impossible de décoder le JSON", "raw" => $cleanData]);
    exit;
}

if (!isset($data['user_id']) || !isset($data['message'])) {
    echo json_encode(["error" => "Données invalides", "received" => $data]);
    exit;
}

$userId = intval($data['user_id']);
$message = trim($data['message']);

try {
    $query = $pdo->prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)");
    $query->execute([$userId, $message]);

    if ($query->rowCount() > 0) {
        echo json_encode(["success" => "Notification enregistrée"]);
    } else {
        echo json_encode(["error" => "Aucune notification insérée"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur SQL: " . $e->getMessage()]);
}
?>
