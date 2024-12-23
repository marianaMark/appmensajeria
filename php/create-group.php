<?php
session_start();
include_once "config.php";

if (!isset($_SESSION['unique_id'])) {
    echo "error";
    exit();
}

if (isset($_POST['group_name']) && isset($_POST['user_ids'])) {
    $group_name = mysqli_real_escape_string($conn, $_POST['group_name']);
    $user_ids = json_decode($_POST['user_ids']);
    $created_by = $_SESSION['unique_id'];

    // Crear el grupo
    $sql = "INSERT INTO groups (group_name, created_by) VALUES ('{$group_name}', '{$created_by}')";
    if (mysqli_query($conn, $sql)) {
        $group_id = mysqli_insert_id($conn);

        // Agregar usuarios al grupo
        foreach ($user_ids as $user_id) {
            $sql = "INSERT INTO group_members (group_id, user_id) VALUES ('{$group_id}', '{$user_id}')";
            mysqli_query($conn, $sql);
        }

        echo "success";
    } else {
        echo "error";
    }
} else {
    echo "Invalid Request";
}
?>
