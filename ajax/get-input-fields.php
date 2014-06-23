<?php

include '../library/JSON.php';
	
$data = array();
$innerHtml = '';

$text_fields_no = intval(trim($_REQUEST['text_fields_no']));

if($text_fields_no != ''){
	if(is_integer($text_fields_no)){
		$innerHtml .= '<div class="alert alert-error" id="err_message_input_container" style="display:none;"></div>';
        $innerHtml .= '<div class="alert alert-success" id="succ_message_input_container" style="display:none;"></div>';
		
		for($i=1; $i<=$text_fields_no; $i++){
			$innerHtml .= '<div class="row">';
            $innerHtml .= '<div class="column1">';
            $innerHtml .= 'Please Enter Number :';
            $innerHtml .= '</div>';
            $innerHtml .= '<div class="column2">';
            $innerHtml .= '<input type="text" id="no_fields_'.$i.'" name="no_fields_'.$i.'" onkeyup="javascript: return validTextInput($(this));" />';
            $innerHtml .= '</div>';
            $innerHtml .= '<br clear="all" />';
            $innerHtml .= '</div>'; 
		}
		
		$data['ErrorCode'] = 0;
		$data['InnerContent'] = $innerHtml;
	}else{
		$data['ErrorCode'] = 1;
		$data['Message'] = 'Please enter numeric number';
	}
}else{
	$data['ErrorCode'] = 1;
	$data['Message'] = 'Please enter number of text fields which you want';
}

die(json_encode($data));
	
?>