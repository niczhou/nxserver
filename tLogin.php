<?php
/*    Using "mysqli" instead of "mysql" that is obsolete.
*     Utilisation de "mysqli" à la place de "mysql" qui est obsolète.
* Change the value of parameter 3 if you have set a password on the root userid
* Changer la valeur du 3e paramètre si vous avez mis un mot de passe à root
*/

	function _post($str){ 
		$val = !empty($_POST[$str]) ? $_POST[$str] : null; 
		return $val; 
	}
	
	$act=$_GET["act"];
	var_dump($act);
	
	$username=_post("user");
	$password=_post("psw");
	
	var_dump($username,$password);
	
 
	$conn=mysqli_connect("localhost","root","");

	if (!$conn) {
		die('could not connet:');
	}else {
		echo 'Connection OK';
		echo "<br/>";
	}
	mysqli_select_db($conn,"test");
	$sql="SELECT * FROM test WHERE username='$username' AND password='$password'";
	print_r($sql);
	echo "<br/>";
	$result=mysqli_query($conn,$sql);
	print_r($result);
	echo "<br/>";
	if($result==false){
		echo 'username or password is invalidat';
		echo '<br/>';
	}else{
		$row=mysqli_fetch_array($result,MYSQLI_BOTH);
		if(count($row)==0){
			echo 'not found';
			echo '<br/>';
		}else{
			echo 'Welcome you '.$row['username'];
		}
		// while($row=mysqli_fetch_array($result,MYSQLI_BOTH)){
				// echo $row['username']."/".$row['password'];
				// echo '<br/>';
		// }
	}
	mysqli_close($conn);
?>
