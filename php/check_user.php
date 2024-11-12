<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: *"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once 'conn.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

if (empty($email) || empty($password)) {
    echo json_encode(["error" => "Email and password are required"]);
    exit();
}

$query = "SELECT id, email FROM users WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($conn, $query);

$user = $result->fetch_assoc();

if ($user) {
    echo json_encode(["success" => true, "id" => $user['id']]);
} else {
    echo json_encode(["success" => false, "error" => "Invalid email or password"]);
}


?>
