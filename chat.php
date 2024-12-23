<?php
session_start();
include_once "php/config.php";

if (!isset($_SESSION['unique_id'])) {
    header("location: login.php");
    exit();
}

if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    header("location: users.php");
    exit();
}

$user_id = mysqli_real_escape_string($conn, $_GET['user_id']);
$sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$user_id}");
if (mysqli_num_rows($sql) > 0) {
    $row = mysqli_fetch_assoc($sql);
} else {
    header("location: users.php");
    exit();
}

$user_query = mysqli_query($conn, "SELECT is_premium, membership_expiry FROM users WHERE unique_id = {$_SESSION['unique_id']}");
if ($user_info = mysqli_fetch_assoc($user_query)) {
    if (!empty($user_info['membership_expiry']) && $user_info['membership_expiry'] < date('Y-m-d')) {
        mysqli_query($conn, "UPDATE users SET is_premium = 0 WHERE unique_id = {$_SESSION['unique_id']}");
        $is_premium = 0;
    } else {
        $is_premium = $user_info['is_premium'];
    }
} else {
    $is_premium = 0;
}
?>
<?php include_once "header.php"; ?>

<body>
    <div class="wrapper">
        <section class="chat-area">
            <header>
                <a href="users.php" class="back-icon"><i class="fas fa-arrow-left"></i></a>
                <img src="php/images/<?php echo $row['img']; ?>" alt="">
                <div class="details">
                    <span>
                        <?php echo $row['fname'] . " " . $row['lname']; ?>
                        <?php if ($is_premium): ?>
                            <i class="fas fa-crown" style="color: gold;" title="Usuario Premium"></i>
                        <?php endif; ?>
                    </span>
                    <p><?php echo $row['status']; ?></p>
                </div>
            </header>

            <div class="chat-box">
                <!-- Mensajes cargados dinámicamente -->
            </div>

            <form id="message-form" class="typing-area" enctype="multipart/form-data">
                <input type="text" class="incoming_id" name="incoming_id" value="<?php echo $user_id; ?>" hidden>
                <input type="text" name="message" class="input-field" placeholder="Escribe tu mensaje aquí..." autocomplete="off">

                <!-- Si el usuario es premium, se muestra el botón para enviar archivos -->
                <?php if ($is_premium): ?>
                    <label for="file-input" class="file-icon" style="cursor: pointer;">
                        <i class="fas fa-paperclip" ></i>
                    </label>
                    <input id="file-input" type="file" name="file" style="display: none;">
                <?php endif; ?>

                <button type="submit"><i class="fab fa-telegram-plane"></i></button>
            </form>
        </section>
    </div>

    <script src="javascript/chat.js"></script>
</body>

</html>
