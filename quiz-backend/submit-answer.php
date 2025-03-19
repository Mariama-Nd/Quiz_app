<?php
// Autoriser les requêtes CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Ajoutez OPTIONS ici
header("Access-Control-Allow-Headers: Content-Type");

// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Vérifiez si la requête est de type OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Inclure le fichier de connexion à la base de données
include 'db.php';

// Récupérer les données envoyées
$data = json_decode(file_get_contents("php://input"));
$user_id = $data->user_id ?? null;
$answer_id = $data->reponse_id ?? null;

// Vérifiez que les données sont valides
if (!$user_id || !$answer_id) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

try {
    // Insérer la réponse dans la table Reponse_Question
    $stmt = $pdo->prepare("INSERT INTO Reponse_Question (user_id, reponse_id) VALUES (?, ?)");
    $stmt->execute([$user_id, $answer_id]);
    
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>