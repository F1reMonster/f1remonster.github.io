<?php
	function debug($data) {
		echo '<pre>' .print_r($data, 1) . '<pre>';
	}
	
	debug ($_FILES);
?>