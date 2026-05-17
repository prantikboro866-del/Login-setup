<?php
session_start();
include 'config.php';

$message = '';
$message_type = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['signup'])) {
        // Signup process
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        $confirm_password = $_POST['confirm_password'] ?? '';

        if (empty($username) || empty($password) || empty($confirm_password)) {
            $message = 'All fields are required.';
            $message_type = 'error';
        } elseif ($password !== $confirm_password) {
            $message = 'Passwords do not match.';
            $message_type = 'error';
        } elseif (strlen($password) < 6) {
            $message = 'Password must be at least 6 characters long.';
            $message_type = 'error';
        } else {
            if (registerUser($conn, $username, $password)) {
                $message = 'Registration successful! You can now log in.';
                $message_type = 'success';
            } else {
                $message = 'Username already exists or registration failed.';
                $message_type = 'error';
            }
        }
    } elseif (isset($_POST['login'])) {
        // Login process
        $username = trim($_POST['login_username'] ?? '');
        $password = $_POST['login_password'] ?? '';

        if (empty($username) || empty($password)) {
            $message = 'Username and password are required.';
            $message_type = 'error';
        } else {
            $user_id = authenticateUser($conn, $username, $password);
            if ($user_id) {
                $_SESSION['user_id'] = $user_id;
                header("Location: dashboard.php");
                exit();
            } else {
                $message = 'Invalid username or password.';
                $message_type = 'error';
            }
        }
    }
}

// If user is already logged in, redirect to dashboard
if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Signup System</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Login & Signup System</h1>
            <p class="subtitle">Secure user authentication</p>
        </header>

        <main>
            <?php if ($message): ?>
                <div class="message <?php echo $message_type; ?>">
                    <?php echo htmlspecialchars($message); ?>
                </div>
            <?php endif; ?>

            <div class="forms-container">
                <!-- Login Form -->
                <section class="form-section">
                    <h2>Login</h2>
                    <form id="loginForm" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" novalidate>
                        <div class="form-group">
                            <label for="login_username">Username <span class="required">*</span></label>
                            <input type="text" id="login_username" name="login_username" placeholder="Enter your username" required>
                            <span class="error-message" id="loginUsernameError"></span>
                        </div>

                        <div class="form-group">
                            <label for="login_password">Password <span class="required">*</span></label>
                            <input type="password" id="login_password" name="login_password" placeholder="Enter your password" required>
                            <span class="error-message" id="loginPasswordError"></span>
                        </div>

                        <button type="submit" name="login" class="btn btn-primary">Login</button>
                    </form>
                </section>

                <!-- Signup Form -->
                <section class="form-section">
                    <h2>Sign Up</h2>
                    <form id="signupForm" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" novalidate>
                        <div class="form-group">
                            <label for="username">Username <span class="required">*</span></label>
                            <input type="text" id="username" name="username" placeholder="Choose a username" required>
                            <span class="error-message" id="usernameError"></span>
                        </div>

                        <div class="form-group">
                            <label for="password">Password <span class="required">*</span></label>
                            <input type="password" id="password" name="password" placeholder="Create a password" required>
                            <span class="error-message" id="passwordError"></span>
                        </div>

                        <div class="form-group">
                            <label for="confirm_password">Confirm Password <span class="required">*</span></label>
                            <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password" required>
                            <span class="error-message" id="confirmPasswordError"></span>
                        </div>

                        <button type="submit" name="signup" class="btn btn-primary">Sign Up</button>
                    </form>
                </section>
            </div>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>