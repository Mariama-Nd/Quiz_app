<?php
header('Access-Control-Allow-Origin: *'); // Permet l'accès depuis n'importe quel domaine
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Méthodes HTTP autorisées
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // En-têtes autorisés
header('Content-Type: application/json'); // Type de contenu par défaut

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Répond aux requêtes préliminaires CORS
    exit;
}
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            echo json_encode(['status' => 'error', 'message' => 'Tous les champs sont obligatoires.']);
            exit;
        }

        $username = htmlspecialchars($data['username']);
        $email = htmlspecialchars($data['email']);
        $password = password_hash($data['password'], PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO User (username, email, password) VALUES (?, ?, ?)");
        if ($stmt->execute([$username, $email, $password])) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Échec de l\'insertion dans la base de données.']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Méthode non autorisée.']);
}
?>
