<?php

$json = $_COOKIE["player"];
$player = json_decode($json, true);
    
// Include the database connection file
include_once("php/config.php");

$stmt = $mysqli->prepare("INSERT INTO scores (name,avatar,pts) VALUES(?, ?, ?)");
$stmt->bind_param("ssi", $player["name"], $player["avatar"], $player["pts"]);
$stmt->execute();

?>
<script>location.href = "index.php";</script>