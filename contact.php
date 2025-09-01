<?php
// Database connection
$servername = "127.0.0.1:4245"; 
$username   = "root";      
$password   = "";          
$dbname     = "optic";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Collect form data
$firstName = $_POST['firstName'];
$lastName  = $_POST['lastName'];
$company   = $_POST['company'];
$email     = $_POST['email'];
$phone     = $_POST['phone'];
$message   = $_POST['message'];

// Checkbox (array)
if (isset($_POST['interest'])) {
    $interests = implode(", ", $_POST['interest']); 
} else {
    $interests = "";
}

// Insert into DB
$sql = "INSERT INTO contact (firstName, lastName, company, email, phone, interests, message) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $firstName, $lastName, $company, $email, $phone, $interests, $message);

if ($stmt->execute()) {
    echo "<div style='text-align:center; margin-top:50px;'>
            <h2 style='color:green;'>✅ Thank you! Your message has been submitted successfully.</h2>
          </div>";

    // Redirect after 3 seconds
    echo "<script>
            setTimeout(function(){
                window.location.href = 'index.html';
            }, 1000);
          </script>";
} else {
    echo "<h2 style='color:red; text-align:center;'>❌ Error: " . $stmt->error . "</h2>";
}

$stmt->close();
$conn->close();
?>
