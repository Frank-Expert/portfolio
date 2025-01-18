<?php
// Add CORS headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $title = $_POST['title'] ?? '';
    $message = $_POST['message'] ?? '';

    if (!empty($email) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $receiver = "greatmind5star@gmail.com";  // Receiver's email address
            $subject = "From: $name <$email>";
            $body = "Name: $name\nEmail: $email\nPhone: $phone\nTitle: $title\n\nMessage: $message\n\nRegards, \n$name";
            $headers = "From: $email";

            if (mail($receiver, $subject, $body, $headers)) {
                echo "Your message has been sent!";
            } else {
                echo "Sorry, failed to send your message!";
            }
        } else {
            echo "Enter a valid email address!";
        }
    } else {
        echo "Email and message fields are required!";
    }
} else {
    echo "Invalid request method.";
}
?>
