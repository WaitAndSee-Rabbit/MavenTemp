/**
 * 去除收尾空格
 */
String.prototype.trim = function(){
    return this.replace(/(^\s+)|(\s+$)/g, "");
}

/**
 * 验证电话号码手机号码，包含至今所有号段
 */
function checkPhone(phone,msg) {
    	var regExp = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/;
	if (regExp.test(phone) == false) {
		alert(msg);
		// 十一位的手机号码；例如：15888888888
		return false;
	}else{
	    return true;
	}
}

/**
 * 验证邮箱
 * 
 * @param Email
 * @return
 */
function checkEmail(Email,msg) {
	var regExp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	if (regExp.test(Email) == false) {
		alert(msg);
		// 网易,QQ,新浪等邮箱 ；例如：cityExpress@sina.com
		return false;
	}else{
	    	return true;
	}
}

/**
 * 验证姓名（6至20个字符，且只能是字母，数字，下划线,且开头必须是字母）
 * 
 * @param name
 * @return
 */

function checkName(name,msg) {
	var regExp = /^([a-zA-Z]|_)\w{6,20}$/;
	if (regExp.test(name) == false) {
		alert(msg);
		// 只能是字母，数字，下划线,且开头必须是字母
		return "false";
	}else{
	    return true;
	}
}

/**
 * 验证指定字符串不能超过多大长度
 * 
 * @param str
 * @param length
 * @param msg
 * @return
 */
function checkStrLength(strl,lengthl,msg){
    var lenl  = lenStr(str) 
    if(lenl>=lengthl){
	alert(msg);
	return false;
    }else{
	return true;
    }
    
}

/**
 * 验证密码，只能是数字，字母，下划线（6-20位）
 * 
 * @param
 * @return
 */
function checkPasswd(passwords,msg) {
	var regExp = /^(\w){6,20}$/;
	if (regExp.test(passwords) == false) {
		alert(msg);
		// 只能是数字，字母，下划线（6-20位)
		return false
	}else{
	    // 正确的密码样式
	    return true;
	}
}

/**
 * 验证特殊字符
 * 
 * @param inputvalue
 * @return
 */
function checkSpecialCharacter(inputvalue) {
	var lstr = inputvalue;
	var SPECIAL_STR = "￥#$~!@%^&*();'\"?><[]{}\\|,:/=+—“”‘";
	for (i = 0; i < lstr.length; i++) {
		if (SPECIAL_STR.indexOf(lstr.charAt(i)) != -1) {
			return false;
		}
	}
	return true;
}

/**
 * 验证字符串的字节长度(oracle中汉字占三个字节)
 * 
 * @param str
 * @return
 */
function lenStr(str) { 
	var length = 0; 
	var strArray = str.split(""); 
	for (var i=0;i<strArray.length;i++) { 
	if (strArray[i].charCodeAt(0)<299) { 
	    	length++; 
		} else { 
		    length+=3; 
		} 
	} 
	return length; 
}

/**
 * 去除全部空格
 * 
 * @param s
 * @return
 */
function replaceTemp(s){
  var str = s.replace(/[ ]/g,"");
  return str;
}

/**
 * 检查字段是否都是数字
 * 
 * @param str
 * @param notice
 * @return
 */
function checkNum(str,notice){
	if(isNaN(str)){
		alert(notice);
		return false;
	}else{
	    return true;	
	}
}

/**
 * 验证小数
 * 
 * @param val
 * @updateTime 2012-1-6 09:09
 * @return
 */
function validateFloat(val){
	 	var patten = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
		return patten.test(val);
	}

