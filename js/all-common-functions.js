var ajax_req = null;

function isInteger(s){
	return (s.toString().search(/^[0-9]+$/) == 0);
}

function isIntegerWithDecimal(s){
	return (s.toString().search(/^[0-9.]+$/) == 0);
}

function keyValid(e, validchars){ 
	var key='', keychar='';
	key = getKeyCode(e);
	if(key == null)
		return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();
	validchars = validchars.toLowerCase();
	if (validchars.indexOf(keychar) != -1)
	  return true;
	if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 )
	  return true;
	return false;
}

function keyRestrict(e, validchars){ 
	var key='', keychar='';
	key = getKeyCode(e);
	if(key == null)
		return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();
	validchars = validchars.toLowerCase();
	if (validchars.indexOf(keychar) == -1)
	  return true;
	if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 )
	  return true;
	return false;
}

function getKeyCode(e){
	if(window.event)
		return window.event.keyCode;
	else if(e)
		return e.which;
	else
		return null;
}

function validateInputFieldsNumber(){
	$('#text_fields_container').html('').hide();
	var text_fields_no = $.trim($('#text_fields_no').val());
	
	var message_txt = '';
	var element = '';
	
	if(text_fields_no == ''){
		message_txt = 'Please enter number of text fields which you want';
        element = $('#text_fields_no');
	}else if(!isInteger(text_fields_no)){
		message_txt = 'Please enter numeric number';
        element = $('#text_fields_no');
	}else{
		$('#err_message_container').animate({height: 'hide', width: 'hide', opacity: 'hide'}, 300);
		$('#btn_submit').attr('disabled', true);
		$('#text_fields_container').html('<div style="text-align:center;"><img src="images/ajax-loader.gif" /></div>').show();
		
		$.ajax({
			url: root_path+"ajax/get-input-fields.php",
			type: "POST",
			data: "text_fields_no="+encodeURIComponent(text_fields_no),
			dataType: "json",
			async:false,
			success: function(resp){
				$('#text_fields_container').html('').hide();
				$('#btn_submit').attr('disabled', false);
				if(resp.ErrorCode == 0){					
					$('#err_message_container').animate({height: 'hide', width: 'hide', opacity: 'hide'}, 300);
					$('#succ_message_container').animate({height: 'hide', width: 'hide', opacity: 'hide'}, 300);
					
					$('#text_fields_container').html(resp.InnerContent).show();
					
					return false;
				}else{
					$('#succ_message_container').animate({height: 'hide', width: 'hide', opacity: 'hide'}, 300);
					$('#err_message_container').animate({height: 'show', width: 'show', opacity: 'show'}, 300);
					$('#err_message_container').html(resp.Message);
					setTimeout("$('#err_message_container').animate({height: 'hide', width: 'hide', opacity: 'hide'}, 300);",50000);
					return false;
				}
			}
		});
	}
	
	
	
	if(message_txt!=""){	
		$('#succ_message_container').animate({height: 'hide', width: 'hide', opacity: 'hide'}, 300);
		$('#err_message_container').animate({height: 'show', width: 'show', opacity: 'show'}, 300);
		$('#err_message_container').html(message_txt);
		element.focus();
		setTimeout("$('#err_message_container').animate({height: 'hide', width: 'hide', opacity: 'hide'}, 300);",50000);
		return false;
	}
	return false;
}

function validTextInput(curr_elem){
	var text_value = $.trim(curr_elem.val());
	
	var total_input_fields = 0;
	var total_input_value = 0;
	var total_user_input = 0;
	
	var parent_elem = curr_elem.parent().parent();
	curr_elem.parent().parent().parent().children().find('input').each(function(){
		total_input_fields++;										   
	});
	
	if(isIntegerWithDecimal(text_value)){
		
		curr_elem.addClass('userinput');
		curr_elem.parent().parent().parent().children().find('input').each(function(){
			if($(this).hasClass('userinput')){
				total_input_value = parseFloat(parseFloat(total_input_value)+parseFloat($(this).val())).toFixed(2);
				total_user_input++;
			}
		});
		
		var remain_input_value = total_value - total_input_value;
		
		curr_elem.parent().parent().siblings().not(curr_elem.parent().parent()).find('input').each(function(){
			if(!$(this).hasClass('userinput')){
			
			var remain_text_value = (remain_input_value/(total_input_fields-total_user_input));
			$(this).val(remain_text_value);
			}
		});
	}
}