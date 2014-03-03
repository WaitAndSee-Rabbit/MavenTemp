package com.cjt.util;

import org.apache.log4j.Logger;

/**
 * 字符串处理
 * @author Administrator
 *
 */
public class VarManage {
	private static final Logger log = Logger.getLogger(VarManage.class);

	private static final String gbk = "gbk";

	private static final String iso = "iso-8859-1";

	private static final String utf = "utf-8";
	

	public synchronized static String converUnicodeToCN(String str){
		  StringBuffer sb = new StringBuffer();
		  String tmp = "";
		  String c = "";
		  //char a = '&';
		  try{
			  for(int i = 0 ;i<str.length();i++){
				  c = "" + str.charAt(i);
				  if(c.equals("&")){
					  tmp = "";
					  for(int j = 0 ;j<8;j++){
						   tmp = tmp + str.charAt(i+j);
					  }
					  tmp = getCN(tmp);
					  sb.append(tmp);
					  i = i+7;
				  }else{
					  sb.append(c.toLowerCase());
				  }
				  
			  } 
		  }catch(Exception e){
		  }
		  return sb.toString();
	}
	
	public synchronized static String getCN(String str){
		String s1 ="";
		try{
			  String tmp = str.replaceAll("&#",",").replaceAll(";","");
			  String [] s2 = tmp.split(",");
			  
			  for (int i=1;i<s2.length;i++){
			    int a = Integer.parseInt(s2[i],10);
			    s1=s1+(char)a;
			  }
		  }
		  catch(Exception e){
			  //log.info("VarManage====getCN===="+e.toString());
		  }
		  return s1;
	}
	public synchronized static String ISOToGBK(String str) {
		try {
			str = new String(str.getBytes(iso), gbk);
			//log.info("VarManage====ISOToGBK===="+str);
		} catch (Exception e) {
			//log.info("VarManage====ISOToGBK===="+e.toString());
		}
		return str;
	}
	public synchronized static String convertIsoToUTF(String str){
		try{
			str = new String(str.getBytes(iso),utf);
			//log.info("VarManage====convertIsoToUTF===="+str);
		}catch(Exception e){
			//log.info("VarManage====convertIsoToUTF===="+e.toString());
		}
		return str;
	}
	public synchronized static String convertUTFTOGBK(String str){
		try{
			str = new String(str.getBytes(utf),gbk);
			//log.info("VarManage====convertIsoToUTF===="+str);
		}catch(Exception e){
			//log.info("VarManage====convertIsoToUTF===="+e.toString());
		}
		return str;
	}
	/**
	 * convert str
	 * 
	 * @param str
	 * @return
	 */
	public synchronized static int StrToInt(String str) {
		int tmp = 0;
		try {
			tmp = Integer.valueOf(str).intValue();
		} catch (Exception e) {
			tmp = 0;
		}
		return tmp;
	}
	public synchronized static int StrToLong(String str) {
		int tmp = 0;
		try {
			tmp = Long.valueOf(str).intValue();
		} catch (Exception e) {
			tmp = 0;
		}
		return tmp;
	}	
	/**
	 * check string return ""
	 * 
	 * @param str
	 * @return
	 */
	public synchronized static String CheckNull(String str) {
		String strReturn = null;
		try {
			//log.info("str====CheckNull===="+str);
			if ((str == null)|| ("".equals(str) || (str.equalsIgnoreCase("null"))))
				strReturn = "";
			else
				strReturn = str;
			//strReturn = covertSymbol(str);
		} catch (Exception e) {
			//log.info("VarManage====CheckNull===="+e.toString());
		}finally{
			//log.info("strReturn====CheckNull===="+strReturn);
		}
		return strReturn;
	}

}




