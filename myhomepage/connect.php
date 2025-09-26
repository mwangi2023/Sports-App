<?php
    $fullName = $_POST['Full Name'];
    $email = $_POST['Email'];
    $password = $_POST['Password'];
    $confirmPassword = $_POST['Confirm Password'];
    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'sports_app');
    if ($conn->connect_error) {
        die('Connection Failed : ' . $conn->connect_error);
    } else {
        if ($password === $confirmPassword) {
            $stmt = $conn->prepare("INSERT INTO users (full_Name, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $fullName, $email, password_hash($password, PASSWORD_BCRYPT));
            if ($stmt->execute()) {
                echo "Registration successful!";
            } else {
                echo "Error: " . $stmt->error;
            }
            $stmt->close();
        } else {
            echo "Passwords do not match.";
        }
        $conn->close();
    }
?>