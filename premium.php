<?php
session_start();
include_once "php/config.php";
if (!isset($_SESSION['unique_id'])) {
  header("location: login.php");
}
?>
<?php include_once "header.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simulación de Pago - Estilo PayPal</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
    }

    .wrapper {
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header h2 {
      color: #003087;
      font-size: 24px;
    }

    .header p {
      color: #555;
      font-size: 16px;
    }

    .payment-options, .payment-form {
      margin-top: 20px;
    }

    .payment-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #f9f9f9;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .payment-option:hover {
      background-color: #eaf0f8;
    }

    .payment-option i {
      font-size: 24px;
      color: #003087;
    }

    .payment-option span {
      font-size: 18px;
      color: #333;
    }

    .payment-form {
      display: none;
      margin-top: 20px;
    }

    .payment-form label {
      display: block;
      margin-bottom: 10px;
      font-size: 16px;
      color: #333;
    }

    .payment-form input {
      width: calc(100% - 20px);
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .confirm-payment {
      text-align: center;
    }

    .confirm-payment button {
      background-color: #0070ba;
      color: white;
      border: none;
      padding: 12px 20px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .confirm-payment button:hover {
      background-color: #005a8d;
    }

    .success-message {
      display: none;
      text-align: center;
      color: #28a745;
      margin-top: 20px;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h2>Pago Seguro</h2>
      <p>Seleccione el método de pago y complete sus datos</p>
    </div>

    <div class="payment-options">
      <div class="payment-option" onclick="showPaymentForm('creditCard')">
        <span>Tarjeta de Crédito</span>
        <i class="fas fa-credit-card"></i>
      </div>
      <div class="payment-option" onclick="showPaymentForm('paypal')">
        <span>PayPal</span>
        <i class="fab fa-paypal"></i>
      </div>
    </div>

    <form id="paymentForm" class="payment-form">
      <label for="cardNumber">Número de Tarjeta</label>
      <input type="text" id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" required>
      
      <label for="cardName">Nombre en la Tarjeta</label>
      <input type="text" id="cardName" name="cardName" placeholder="John Doe" required>
      
      <label for="expiryDate">Fecha de Vencimiento</label>
      <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/AA" required>
      
      <label for="cvv">CVV</label>
      <input type="password" id="cvv" name="cvv" placeholder="123" required>

      <div class="confirm-payment">
        <button type="button" onclick="processPayment()">Pagar Ahora</button>
      </div>
    </form>

    <div id="successMessage" class="success-message">
      <p>¡Pago realizado con éxito!</p>
      <a href="chat.php" class="back-to-chat">Volver al Chat</a>
    </div>
  </div>

  <script>
    function showPaymentForm(method) {
      document.getElementById('paymentForm').style.display = 'block';
    }

    function processPayment() {
  const form = document.getElementById('paymentForm');
  if (form.reportValidity()) {
    // Simular el proceso de pago
    const userId = <?php echo $_SESSION['unique_id']; ?>; // ID del usuario logueado

    fetch('php/update_premium_status.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
      } else {
        alert('Hubo un problema al procesar el pago. Inténtalo de nuevo.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema con el servidor. Inténtalo más tarde.');
    });
  }
}

  </script>
</body>
</html>
