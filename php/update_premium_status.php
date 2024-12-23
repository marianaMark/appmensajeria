<?php
session_start();
include_once "config.php";

header('Content-Type: application/json');

// Validar si los datos se recibieron correctamente
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userId']) && isset($_SESSION['unique_id'])) {
    $userId = mysqli_real_escape_string($conn, $data['userId']);
    $currentDate = date('Y-m-d');
    $expiryDate = date('Y-m-d', strtotime('+1 month')); // Asignar membresía válida por 1 mes

    // Actualizar el estado premium en la base de datos
    $sql = "UPDATE users SET is_premium = 1, membership_expiry = '$expiryDate' WHERE unique_id = '$userId'";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(['success' => true, 'message' => 'Estado premium actualizado.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el estado.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos no válidos o sesión expirada.']);
}
?>
