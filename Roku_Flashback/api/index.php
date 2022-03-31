<?php
  // route requests for CRUD
  require('../config/connect.php');
// this needs to come back out once the post is working
// this is demo only

  if (isset($_POST['username'])) {
      echo 'username via POST:' . $_POST["username"];
      die('  ...and imma stop here');
  }

  $query = "SELECT * FROM tbl_movies";

  if (isset($_GET['id'])) {
      $movID = $_GET['id'];
      $query .= ' WHERE movies_id="'.$movID.'"';
  }

  $result = array();
  $runQuery = $pdo->query($query);

  while ($row = $runQuery->fetchAll(PDO::FETCH_ASSOC)) {
      $result[] = $row;
  }

  echo json_encode($result);
