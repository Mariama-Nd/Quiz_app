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

        if (empty($data['question_id']) || empty($data['responses'])) {
            echo json_encode(['status' => 'error', 'message' => 'Données manquantes.']);
            exit;
        }

        $question_id = (int)$data['question_id'];
        $responses = $data['responses'];

        // Insérer les réponses
        $stmt = $pdo->prepare("INSERT INTO Reponse (reponse_text, question_id, is_correct, created_at) VALUES (?, ?, ?, NOW())");
        foreach ($responses as $response) {
            // Vérifiez que les valeurs sont bien définies
            if (isset($response['text']) && isset($response['isCorrect'])) {
                $stmt->execute([htmlspecialchars($response['text']), $question_id, (int)$response['isCorrect']]);
            }
        }

        echo json_encode(['status' => 'success', 'message' => 'Réponses ajoutées avec succès.']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>