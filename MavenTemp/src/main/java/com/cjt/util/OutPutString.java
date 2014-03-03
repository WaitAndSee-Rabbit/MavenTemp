package com.cjt.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

public class OutPutString {

	private static Logger logger = Logger.getLogger(OutPutString.class);

	/**
	 * @Struts直接输出字符串
	 * 
	 * @param str
	 */
	public static void writerInfo(String str) {
		PrintWriter writer = null;
		try {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			writer = response.getWriter();
			writer.print(str);
		} catch (IOException e) {
			logger.error("io流输出异常",e);
			e.printStackTrace();
		}finally{
			closeWriter(writer);
		}
	}

	/**
	 * @获取PrintWriter 有时候可能需要进行多次的判定实现不同信息的输出，直接获取一个printwriter更加的方便
	 * 
	 * @return
	 */
	public static PrintWriter getWriter() {
		PrintWriter writer = null;
		try {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setContentType("text/html;charset=utf-8");
			writer = response.getWriter();
		} catch (Exception e) {
			logger.error("获取PrintWriter异常",e);
			e.printStackTrace();
		}
		return writer;
	}

	/**
	 * 将writer流推送出去，且关闭writer
	 * 
	 * @param writer
	 */
	public static void closeWriter(PrintWriter writer) {
		writer.flush();
		if (writer != null) {
			writer.close();
			writer = null;
		}
	}
}
