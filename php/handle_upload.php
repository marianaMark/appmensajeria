<?php
session_start();
include_once "config.php";

if (isset($_SESSION['unique_id'])) {
    $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
    $outgoing_id = $_SESSION['unique_id'];
    $message = mysqli_real_escape_string($conn, $_POST['message']);

    // Verificar si es premium
    $query = mysqli_query($conn, "SELECT is_premium FROM users WHERE unique_id = {$outgoing_id}");
    $user = mysqli_fetch_assoc($query);

    if (!empty($message) || ($_FILES['file']['name'] && $user['is_premium'] == 1)) {
        $file_path = "";

        // Manejo de archivo si es premium
        if (!empty($_FILES['file']['name']) && $user['is_premium'] == 1) {
            $file_name = time() . "_" . $_FILES['file']['name'];
            $file_tmp = $_FILES['file']['tmp_name'];
            $file_path = "uploads/" . $file_name;

            if (!move_uploaded_file($file_tmp, $file_path)) {
                echo "Error al subir el archivo.";
                exit();
            }
        }

        // Insertar mensaje
        $sql = "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg, file_path)
                VALUES ({$incoming_id}, {$outgoing_id}, '{$message}', '{$file_path}')";
        mysqli_query($conn, $sql);
    }
} else {
    header("location: ../login.php");
}
