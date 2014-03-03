package com.cjt.util;

import java.util.Properties;
import org.apache.log4j.Logger;


/**
 * 系统参数
 * 
 * @author Administrator
 * 
 */
public class SysConfig {
	private static final Logger log = Logger.getLogger(SysConfig.class);
	public static final String CONTEXTPATH = getContextPath();

	public static final String SystemProp = "/global/system.properties";

	public synchronized static int getSystemInt(String key) {
		int result = 0;
		try {
			result = Integer.valueOf(getSystem(key));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return result;
	}

	public synchronized static String getSystem(String key) {
		String str = null;
		try {
			str = getValue(SystemProp, key);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return str;
	}

	public synchronized static String getValue(String path, String key) {
		Properties proFile = new Properties();
		String str = "";
		try {
			proFile.load(Thread.currentThread().getContextClassLoader()
					.getResourceAsStream(path));
			str = new String(proFile.getProperty(key));
		} catch (Exception e) {
			str = "";
			log.error(e.getMessage(), e);
		}finally{
			//log.error(key+"==="+str);
		}
		str = VarManage.ISOToGBK(str);
		return str;
	}

	public synchronized static String getContextPath() {
		String str = "";
		try {
			String path = SysConfig.class.getClassLoader().getResource("")
					.toString();
			String os = System.getProperty("os.name");
			log.info("getContextPath+os===:" + os);
			log.info("getContextPath+path===:" + path);
			if (os.toLowerCase().indexOf("windows") > -1)
				str = path.substring(6, path.length() - 16);
			else
				str = path.substring(5, path.length() - 16);
			log.info("str==========" + str);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return str;
	}

	public static void main(String[] arg) {
		try {
			System.out.println("x==="+getContextPath());
			System.out.println("xx==="+SysConfig.class.getResource("/"));
			System.out.println("11==="
					+ SysConfig.class.getResourceAsStream(""));
			System.out.println("22==="+Thread.currentThread().getContextClassLoader()
							.getResource(""));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}
}
