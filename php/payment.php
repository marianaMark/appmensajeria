<?php
session_start();
include_once "config.php";

// Verificar si el usuario está logueado
if (!isset($_SESSION['unique_id'])) {
  header("location: login.php");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Suponemos que el pago fue exitoso, ahora actualizamos el estado premium del usuario
  $userId = $_SESSION['unique_id'];
  $sql = "UPDATE users SET is_premium = 1 WHERE unique_id = $userId";
  
  if (mysqli_query($conn, $sql)) {
    echo "¡Felicidades! Ahora eres usuario Premium.";
    // Redirigir a la página de chat
    header("location: chat.php");
  } else {
    echo "Hubo un error al activar tu cuenta Premium.";
  }
}
?>

<form method="POST" action="payment.php">
  <button type="submit">Pagar por Premium</button>
</form>
