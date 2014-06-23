<?php

$root_path =  'http://www.domainame.com/'; //Add your domain name with full path

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Auto Input</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<!-- Styles -->
<link href="css/style.css" rel="stylesheet" media="screen">
<!-- Javascript -->
<script type="text/javascript">
	var root_path = '<?php echo $root_path; ?>';
	var total_value = 100;
</script>
<script src="js/jquery.min.js" type="text/javascript"></script>
<script src="js/all-common-functions.js" type="text/javascript"></script>

</head>
<body>
	<div class="main-container">
        <h3>Auto Input</h3>
        <hr />
        <div class="container">
        	<div class="alert alert-error" id="err_message_container" style="display:none;"></div>
            <div class="alert alert-success" id="succ_message_container" style="display:none;"></div>
            <div class="row">
                <div class="column1">
                	Please Enter Input Fields Number shown in form:
                </div>
                <div class="column2">
                	<input type="text" id="text_fields_no" name="text_fields_no" onKeyPress="javascript: return keyValid(event, '0123456789');" />
                </div>
                <br clear="all" />
            </div>
            <div class="row">
                <div class="column1">
                	&nbsp;
                </div>
                <div class="column2">
                	<input type="submit" name="btn_submit" value="SUBMIT" onClick="return validateInputFieldsNumber();" />
                </div>
                <br clear="all" />
            </div>
        </div> 
        <hr />
        <div id="text_fields_container" class="container" style="display:none;">            
            
        </div>  
	</div>
</body>
</html>