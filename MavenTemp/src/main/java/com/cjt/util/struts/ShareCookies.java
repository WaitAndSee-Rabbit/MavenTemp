package com.cjt.util.struts;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.cjt.util.code.MD5;
import com.cjt.util.code.UrlCode;


public class ShareCookies {
	private static final Logger log = Logger.getLogger(ShareCookies.class);
	
	private String cookPath = null;
	private HttpServletRequest req = null;
	private HttpServletResponse resp = null;

	/**
	 * 创建对象的时候进行参数赋值
	 * 
	 * @param req
	 * @param resp
	 */
	public ShareCookies(HttpServletRequest req, HttpServletResponse resp,String cookPath) {
		this.req = req;
		this.resp = resp;
		this.cookPath = cookPath;
	}

	/**
	 * 
	 * @param key
	 * @return
	 */
	public String getValue(String key) {
		String value = null;
		try {
			if(key==null||key.equals("")) return null;
			//log.info("get-xx-ke-="+key);
			String value_x = null;
			String key_x = MD5.Encode(key);
			//log.info("get-xx-key_x-"+key_x);
			Cookie[] cookies = req.getCookies();
			if (cookies != null) {
				for (Cookie c : cookies) {
					//cookie.setDomain(".iisp.com");
					//log.info("c.getName()22==="+c.getName());
					if (c.getName().equalsIgnoreCase(key_x)) {
						value_x = c.getValue(); 
					}
				}
			}
			//log.info("get--key-"+key+";value-"+value_x);
			if(!(value_x==null||value_x.equals("")))
				value = UrlCode.Decode(value_x);
			//log.info("get--key-"+key+";value-"+value_x);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}finally{
			//log.info("key-"+key+";value-"+value);
		}
		return value;
	}

	/**
	 * 写cookies
	 * 
	 * @param hm
	 * @return
	 */
	public boolean setValue(String key,String value) {
		boolean bln = false;
		try {
			if(key==null||value==null||key.equals("")||value.equals(""))
				return bln;
			//log.info("set--key-" + key+";value-"+value+";cookPath=="+cookPath);
			key = MD5.Encode(key);
			value = UrlCode.Encode(value);
			//log.info("set--key-" + key+";value-"+value);
			Cookie c = new Cookie(key, value);
			c.setMaxAge(60 * 60 * 24);// cookie时间
			c.setPath(cookPath); // 根据个人的不用，在不同功能的路径下创建
			resp.addCookie(c);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return bln;
	}
	/**
	 * 删除部分cookies
	 * 
	 * @return
	 */
	public void removeCookies(String key) {
		try {
			key = MD5.Encode(key);
			Cookie[] cookies = req.getCookies();
			if (cookies != null) {
				for (int i = 0; i < cookies.length; i++) {
					Cookie c = cookies[i];
					if(c.getName().equals(key)){
						Cookie cookie = new Cookie(c.getName(), null);
						cookie.setMaxAge(0);
						cookie.setPath(cookPath);// 根据你创建cookie的路径进行填写
						resp.addCookie(cookie);
					}
				}
			}
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return;
	}
	/**
	 * 清除cookies
	 * @param key
	 */
	public void clearCookies() {
		try {
			//log.info("===============");
			Cookie[] cookies = req.getCookies();
			if (cookies != null) {
				for (Cookie c : cookies) {
					if(c.getPath()==null) continue;
					if(c.getPath().equals(cookPath)){
						Cookie cookie = new Cookie(c.getName(), null);
						cookie.setMaxAge(0);
						cookie.setPath(cookPath);// 根据你创建cookie的路径进行填写
						resp.addCookie(cookie);
					}
				}
			}
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return;
	}
}