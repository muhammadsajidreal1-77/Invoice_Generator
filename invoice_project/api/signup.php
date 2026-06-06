<?php

header("Access-Control-Allow-Origin: *");


header("Content-Type: application/json");





$conn = mysqli_connect("localhost", "root", "", "invoice_db");

if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Database Connection failed!"]);
    exit;
}


$data = json_decode(file_get_contents("php://input"), true);



$businessName = $data['businessName'];



$businessAddress = $data['businessAddress'];
$email = $data['email'];



$password = $data['password'];


$checkQuery = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $checkQuery);





if (mysqli_num_rows($result) > 0) {


    echo json_encode(["status" => "error", "message" => "This email is already registered!"]);
    exit;

}




$insertQuery = "INSERT INTO users (business_name, business_address, email, password) 
        VALUES ('$businessName', '$businessAddress', '$email', '$password')";



        if (mysqli_query($conn, $insertQuery)) {



            echo json_encode(["status" => "success", "message" => "Account Created successfully!"]);




        } else {
            echo json_encode(["status" => "error", "message" => "Something went wrong!"]);




            }

 mysqli_close($conn);





 ?>       