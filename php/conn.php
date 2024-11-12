<?php

$conn = mysqli_connect("localhost", "root", "", "social_network");

if (!$conn) {
    die(json_encode(["error" => "Database connection failed"]));
}


