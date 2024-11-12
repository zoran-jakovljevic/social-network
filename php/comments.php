<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'conn.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

if($method == 'POST'){

    $user_id = $data['user_id'];
    $post_id = $data['post_id'];
    $content = $data['content'];

    $query = "INSERT INTO comments(user_id, post_id, content) VALUES ('$user_id', '$post_id', '$content')";
    $result = mysqli_query($conn, $query);

    if($result){
        echo json_encode(["user_id" => $user_id, "post_id" => $post_id, "content" => $content]);
    } else{
        echo json_encode(["message" => "error"]);
    }

}

if($method == 'GET') {
    $post_id = $_GET['post_id'];
    $query = "SELECT user_id, content, post_id FROM comments WHERE post_id = '$post_id'";
    $result = mysqli_query($conn, $query);

    $comments = [];

    while($row = mysqli_fetch_assoc($result)){
        $comments[] = $row;
    }

    echo json_encode($comments);  
}





?>