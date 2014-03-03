package com.cjt.util;


public class StaticVariable {
	
	public static final String SITE_TITLE = SysConfig.getSystem("SITE_TITLE");
	public static final String SYSTEM_VERSION = SysConfig.getSystem("SYSTEM_VERSION");
	public static final String COPY_RIGHT = SysConfig.getSystem("COPY_RIGHT");
	// URL会话ID
	public static final String URL_SID = "sid";
	
	/**
	 * 系统登录处理，静态参数
	 */
	// 会话中存储的SessionID
	public static final String KEY_USERID = "userid";
	public static final String KEY_SHOPID = "shopid";
	public static final String KEy_SHOPINFOS = "allShopInfo";
	
	// 访问来源key
	public static final String KEY_FROM = "from";
	// 日期时间
	public static final String KEY_DATE = "date";
	// cookie 中存储的路径
	public static final String COOKIE_PATH = "/";
	
	public static String FRAME_DEFAULT = "default.xhtml";

	public static void main(String arg[]){
	}
}
