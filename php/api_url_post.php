<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'conn.php';

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

if ($method == 'POST') {
    $user_id = $data['user_id'];
    $content = $data['content'];
    $likes = $data['likes'];

    if (empty($content)) {
        echo json_encode(['error' => 'Missing data']);
        exit;
    }

    $query = "INSERT INTO Posts (user_id, content, likes) VALUES ('$user_id', '$content', '$likes')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $post_id = mysqli_insert_id($conn);
        echo json_encode([
            'id' => $post_id,
            'user_id' => $user_id,
            'content' => $content,
            'likes' => $likes
        ]);
    } else {
        echo json_encode(['error' => 'Error']);
    }

}

if ($method == 'GET') {
    $query = "SELECT id, user_id, content, likes FROM Posts ORDER BY id DESC";
    $result = mysqli_query($conn, $query);

    $posts = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $posts[] = $row;
    }

    echo json_encode($posts);
    exit;
}

if ($method == 'PUT'){

    $id = $data['post_id'];
    $user_id = $data['user_id'];

    $query = "UPDATE `posts` SET `likes`= likes + 1 WHERE `id`='$id'";
    $result = mysqli_query($conn, $query);

    if($result){
        echo json_encode(['success' => 'success']);
    } else{
        echo json_encode(['error' => 'error']);
    }


}

if($method == "DELETE"){

    $post_id = $data['post_id'];

    $query = "DELETE FROM posts WHERE id = '$post_id'";
    $result = mysqli_query($conn, $query);

    if($result){
        echo json_encode(['message' => 'Deleted successfully']);
    } else{
        echo json_encode(['message' => 'Error deleting post']);
    }
    
}


?>
