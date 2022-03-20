<?php

// First attempt at image uploading.

if (($_FILES['my_file']['name']!="")){
// Where the file is going to be stored
	$target_dir = "ProfilePictures/"; // This is a directory on a server. We don't have a server directory yet.
	$file = $_FILES['my_file']['name'];
	$path = pathinfo($file);
	$filename = $path['filename'];
	$ext = $path['extension'];
	$temp_name = $_FILES['my_file']['tmp_name'];
	$path_filename_ext = $target_dir.$filename.".".$ext;
 
// Check if file already exists
if (file_exists($path_filename_ext)) {
 echo "Sorry, file already exists.";
 }else{
 move_uploaded_file($temp_name,$path_filename_ext);
 echo "Congratulations! File Uploaded Successfully.";
 }
}

// This should probably work. Can't test yet cause haven't figured
// out how to change directory to local files or chatengine server.
// This only uploads an image, it doesn't actually set the profile 
// picture. That has to be done through a separate function in App.js
// using chatengine API.
