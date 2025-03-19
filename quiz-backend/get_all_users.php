<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require 'db.php';

try {
    // 🔥 Vérifier la table correcte (majuscule `User` au lieu de `users`)
    $query = $pdo->query("SELECT id, username FROM User");
    $users = $query->fetchAll(PDO::FETCH_ASSOC);

    // 🔥 S'assurer que la sortie est bien un tableau JSON
    if (!$users || !is_array($users)) {
        $users = [];
    }

    echo json_encode($users, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur SQL: " . $e->getMessage()]);
}
?>
