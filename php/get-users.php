<?php
session_start();
include_once "config.php";

$sql = "SELECT * FROM users WHERE unique_id != {$_SESSION['unique_id']}";
$query = mysqli_query($conn, $sql);
$output = "";

if (mysqli_num_rows($query) > 0) {
    while ($row = mysqli_fetch_assoc($query)) {
        $output .= '<label><input type="checkbox" value="' . $row['unique_id'] . '"> ' . $row['fname'] . ' ' . $row['lname'] . '</label><br>';
    }
} else {
    $output .= "No hay usuarios disponibles.";
}

echo $output;
?>
