<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['email']) || empty($data['password'])) {
            echo json_encode(['status' => 'error', 'message' => 'Email et mot de passe obligatoires.']);
            exit;
        }

        $email = htmlspecialchars($data['email']);
        $password = $data['password'];

        $stmt = $pdo->prepare("SELECT id, username, email, created_at, password FROM User WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC); // Utiliser PDO::FETCH_ASSOC pour éviter les doublons numériques

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']); // Supprimer le mot de passe avant de l'envoyer
            echo json_encode(['status' => 'success', 'user' => $user]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Identifiants incorrects.']);
        }
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>
