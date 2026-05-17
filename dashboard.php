<?php
session_start();
include 'config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

$user = getUserById($conn, $_SESSION['user_id']);
if (!$user) {
    session_destroy();
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - <?php echo htmlspecialchars($user['username']); ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome, <?php echo htmlspecialchars($user['username']); ?>!</h1>
            <p class="subtitle">You are successfully logged in</p>
        </header>

        <main>
            <section class="dashboard-section">
                <h2>Dashboard</h2>
                <div class="dashboard-content">
                    <p>You have successfully authenticated into the system.</p>
                    <p>Your user ID: <?php echo htmlspecialchars($user['id']); ?></p>
                    <p>Login time: <?php echo date('Y-m-d H:i:s'); ?></p>
                </div>

                <div class="button-group">
                    <a href="logout.php" class="btn btn-secondary">Logout</a>
                </div>
            </section>
        </main>
    </div>
</body>
</html>