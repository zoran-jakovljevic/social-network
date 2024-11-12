<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: *"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once 'conn.php';

$data = json_decode(file_get_contents("php://input"), true);
$method = $_SERVER['REQUEST_METHOD'];


if($method == 'POST'){

    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];

    $query = "INSERT INTO users (email, username, password) VALUES ('$email', '$username', '$password')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $user_id = mysqli_insert_id($conn); 
        echo json_encode(["message" => "Registration successful", "id" => $user_id]);
    } else {
        echo json_encode(["error" => "Error"]);
    }
}

if($method == 'DELETE'){

    $id = $data['id'];

    if (!isset($data['id'])) {
        echo json_encode(["error" => "User ID is missing"]);
        exit();
    }
    
    $query = "DELETE FROM users WHERE id = '$id'";
    $result = mysqli_query($conn, $query);
    
    if($result){
        echo json_encode(["success" => "success"]);
        exit();
    } else{
        echo json_encode(["error" => "error"]);
        exit();
    }

}

if($method == 'PUT'){

    $username = $data['username'];
    $email = $data['email'];
    $id = $data['id'];

    $query = "UPDATE users SET email = '$email', username = '$username' WHERE id = '$id'";
    $result = mysqli_query($conn, $query);

    if($result){
        echo json_encode(["success" => "success"]);
    }else{
        echo json_encode(["error" => "error"]);
    }
}

if($method == 'GET'){

    $id = $_GET['id'];

    $query = "SELECT email, username FROM users WHERE id = '$id'";
    $result = mysqli_query($conn, $query);

    $user = mysqli_fetch_assoc($result);

    if($user){
        echo json_encode(["email" => $user['email'], "username" => $user["username"]]); 
    }else{
        echo json_encode(["error" => "Error", 'id' => $id]);
    }
}


?>