<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");




$conn = mysqli_connect("localhost", "root", "", "invoice_db");

if(!$conn) {
    echo json_encode(["status" => "error", "message" => "Database connection failed!"]);


    exit;


}

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];



$quey = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";

$result = mysqli_query($conn, $quey);

if (mysqli_num_rows($result) > 0) {



    $user = mysqli_fetch_assoc($result);
    echo json_encode([
    "status" => "success",




    "message" => "Login successful!",
    "user" => [


    "businessName" => $user['business_name'],

    "businessAddress" => $user['business_address'],
    "email" => $user['email'] 





    ] 
    ]);

} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password!"]);
}

mysqli_close($conn);






?> 



