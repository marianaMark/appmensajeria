// Simular el proceso de pago
document.getElementById("payWithCard").addEventListener("click", function() {
    document.getElementById("paymentStatus").innerHTML = "Pago realizado con tarjeta de crédito. Generando factura...";
  
    // Simular la generación de una factura
    setTimeout(function() {
      document.getElementById("paymentStatus").innerHTML += "<br><strong>Factura generada:</strong> Pago exitoso de $100. Gracias por tu compra.";
    }, 2000);
  });
  
  document.getElementById("payWithPayPal").addEventListener("click", function() {
    document.getElementById("paymentStatus").innerHTML = "Pago realizado a través de PayPal. Generando factura...";
  
    // Simular la generación de una factura
    setTimeout(function() {
      document.getElementById("paymentStatus").innerHTML += "<br><strong>Factura generada:</strong> Pago exitoso de $100. Gracias por tu compra.";
    }, 2000);
  });
  
  // Cargar archivos
  document.getElementById("uploadFile").addEventListener("click", function() {
    var files = document.getElementById("fileInput").files;
    
    if (files.length > 0) {
      document.getElementById("paymentStatus").innerHTML += "<br>Archivos cargados: " + files.length + " archivo(s).";
      
      // Aquí se podrían almacenar los archivos en el servidor usando AJAX.
    } else {
      document.getElementById("paymentStatus").innerHTML += "<br>No se seleccionaron archivos.";
    }
  });
  