<?php
include('libwiris.php');

$digest = false;

if (isset($_POST['md5']) && mb_strlen($_POST['md5']) == 32) {		// Support for "generic simple" integration.
	$digest = $_POST['md5'];
}
else if (isset($_POST['digest'])) {		// Support for future integrations (where maybe they aren't using md5 sums).
	$digest = $_POST['digest'];
}

if ($digest !== false) {
	$filePath = $formulaDirectory . '/' . basename($digest) . '.xml';
	
	if (is_file($filePath)) {
		if (($content = file_get_contents($filePath)) !== false) {
			$properties = explode("\n", $content);
			echo $properties[0];
		}
		else {
			echo 'Error: can\'t read the formula. Check your file privileges.';
		}
	}
}
else {
	echo 'Error: no digest has been sended.';
}
?>