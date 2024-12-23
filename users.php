<?php
session_start();
include_once "php/config.php";
if (!isset($_SESSION['unique_id'])) {
  header("location: login.php");
}
?>
<?php include_once "header.php"; ?>

<body>
  <div class="wrapper">
    <section class="users">
      <header>
        <div class="content">
          <?php
          $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$_SESSION['unique_id']}");
          if (mysqli_num_rows($sql) > 0) {
            $row = mysqli_fetch_assoc($sql);
          }
          ?>
          <img src="php/imagenes/<?php echo $row['img']; ?>" alt="">
          <div class="details">
            <span><?php echo $row['fname'] . " " . $row['lname'] ?></span>
            <p><?php echo $row['status']; ?></p>
          </div>
        </div>
        <a href="php/logout.php?logout_id=<?php echo $row['unique_id']; ?>" class="logout">Cerrar Sesión</a>
        
        <!-- Icono de la corona para redirigir a premium.php -->
        <a href="premium.php" class="premium-link">
          <i class="fas fa-crown"></i> Premium
        </a>
      </header>
      <div class="search">
        <span class="text">Con quien quieres hablar</span>
        <input type="text" placeholder="Introduzca el nombre para buscar...">
        <button><i class="fas fa-search"></i></button>
      </div>

      <!-- Botón para crear grupo -->
      <div class="create-group">
        <button id="create-group-btn"><i class="fas fa-plus"></i></button>
      </div>

      <!-- Lista de usuarios o grupos -->
      <div class="users-list">
      </div>

      <!-- Modal para crear un grupo -->
      <div id="create-group-modal" class="modal">
        <div class="modal-content">
          <h3>Crear un nuevo grupo</h3>
          <input type="text" id="group-name" placeholder="Nombre del grupo" required />
          <div id="user-list">
            <!-- Lista de usuarios cargados dinámicamente -->
          </div>
          <button id="save-group-btn">Guardar Grupo</button>
          <button id="cancel-group-btn">Cancelar</button>
        </div>
      </div>

      
    </section>
  </div>

  <script src="javascript/users.js"></script>
<style>/* Estilos generales */
body {
  font-family: Arial, sans-serif;
}

/* Enlace con icono de la corona para el acceso premium */
.premium-link {
  color: #ffcc00;  /* Color dorado para el icono */
  font-size: 18px;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
}

.premium-link i {
  margin-right: 5px;
  font-size: 24px;  /* Tamaño del icono */
}

/* Botón de sesión */
.logout {
  color: #ff0000;
  font-size: 16px;
  text-decoration: none;
  padding: 5px;
}

.logout:hover {
  color: #cc0000;
}

/* Estilos adicionales si es necesario */
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.users {
  padding: 20px;
}

.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.details {
  margin-left: 10px;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
}

</style>
</body>

</html>
