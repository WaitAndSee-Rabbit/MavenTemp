package com.cjt.util.struts;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

public class ShareSession {
	private static final Logger log = Logger.getLogger(ShareSession.class);

	private HttpSession session = null;
	/**
	 * 创建对象的时候进行参数赋值
	 * @param req
	 * @param resp
	 */
	public ShareSession(HttpSession session){
		this.session = session;
	}
	/**
	 * 获得参数
	 * @param key
	 * @return
	 */
	public String getValue(String key){
		String value = null;
		try{
			value = (String)session.getAttribute(key);
			if(value==null||value.equals("")){
				value = "";
			}
		}catch(Exception e){
			log.error(e.getMessage(),e);
		}finally{
			//log.info("key-"+key+";value-"+value);
		}
		return value;
	}
	
	public boolean setValue(String key,String value){
		boolean bln = false;
		try{
			removeSession(key);
			//log.info("key="+key+";value="+value);
			session.setAttribute(key, value);
			bln = true;
		}catch(Exception e){
			log.error(e.getMessage(),e);
		}
		return bln;
	}
	
	public void removeSession(String key){
		try{
		  session.removeAttribute(key);
		}catch(Exception e){
			//log.error(e.getMessage(),e);
		}
	}
	public void cleanSession(){
		try{
			if(session!=null)
		  session.invalidate();
		}catch(Exception e){
			log.error(e.getMessage(),e);
		}
	}
}
