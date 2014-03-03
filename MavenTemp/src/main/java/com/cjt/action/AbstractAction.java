package com.cjt.action;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import org.apache.log4j.Logger;

import com.cjt.util.StaticVariable;
import com.cjt.util.VarManage;
import com.cjt.util.struts.AbstractActionUtil;
import com.cjt.util.struts.ShareCookies;
import com.cjt.util.struts.ShareParams;

@SuppressWarnings("serial")
public abstract class AbstractAction extends AbstractActionUtil {

	private static final Logger logger = Logger.getLogger(AbstractAction.class);
	private static final String PAGE_ENCODE = "utf-8";
	//
	private String SiteTitle = StaticVariable.SITE_TITLE;
	private String SysVersion = StaticVariable.SYSTEM_VERSION;
	private String CopyRight = StaticVariable.COPY_RIGHT;

	private String CurrentTime = null;
	private static String ContextUrl = null;
	private String CurrentUrl = null;
	private String userid = null;
	private String sid = null;

	public String getSiteTitle() {
		// log.debug("SiteTitle====="+SiteTitle);
		return SiteTitle;
	}

	public String getContextUrl() {
		if (ContextUrl != null)
			return ContextUrl;
		String url = getReq().getRequestURL().toString();
		String context = getReq().getContextPath();
		int pos = url.indexOf(context);
		ContextUrl = url.substring(0, pos + context.length());
		// log.debug("ContextUrl====" + ContextUrl);
		return ContextUrl;
	}

	public String getCurrentUrl() {
		// log.debug("CurrentUrl=11===" + CurrentUrl);
		CurrentUrl = getReq().getRequestURL().toString();
		CurrentUrl = CurrentUrl.replace(".jsp", ".xhtml");
		// log.debug("CurrentUrl=22===" + CurrentUrl);
		return CurrentUrl;
	}

	public String getSysVersion() {
		return SysVersion;
	}

	public String getCopyRight() {
		return CopyRight;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUserid() {
		try {
			userid = getParameter(StaticVariable.KEY_USERID);
			if (userid != null)
				return userid;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			logger.info("xxxxxxx==" + userid);
		}
		return userid;
	}

	/**
	 * session id管理
	 * 
	 * @return
	 */
	public String getSid() {
		String sid = null;
		try {
			HashMap hm = new HashMap();
			hm.put(StaticVariable.KEY_USERID,
					getParameter(StaticVariable.KEY_USERID));

			sid = ShareParams.encodeSID(hm);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return sid;
	}

	/**
	 * 获取req和session中的参数
	 * 
	 * @param key
	 * @return
	 */
	public String getParameter(String key) {
		String value = null;
		try {
			// 2 从Url中获取
			value = (String) getReq().getSession().getAttribute(key);
			logger.info("0001=" + key + "=" + value);
			if (value != null)
				return value;

			// 3 从Url中获取
			ShareCookies cookies = new ShareCookies(getReq(), getResp(),
					StaticVariable.COOKIE_PATH);
			value = cookies.getValue(key);
			logger.info("0002=" + key + "=" + value);
			if (value != null)
				return value;

			// 4 从Url中获取
			String sid = VarManage.CheckNull(getReq().getParameter("sid"));
			if (!sid.equals("")) {
				HashMap hm = ShareParams.decodeSID(sid);
				value = (String) hm.get(key);
			}
			logger.info("0003=" + key + "=" + value);
			// 5 从Url中获取
			value = this.getReq().getParameter(key);
			logger.info("0004=" + key + "=" + value);
			if (value != null)
				return value;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (value == null || value.equals(""))
				value = "";
		}

		return value;
	}

	/**
	 * 获取当前时间
	 * 
	 * @return
	 */
	public String getCurrentTime() {
		return new SimpleDateFormat("yyyy年MM月dd日 hh:mm:ss").format(new Date());
	}

	/**
	 * print web
	 * 
	 * @param content
	 */
	public void OutPrintWriter(String content) {
		PrintWriter out = null;
		try {
			this.getResp().setCharacterEncoding(PAGE_ENCODE);
			this.getResp().setContentType("text/html; charset=" + PAGE_ENCODE);
			out = this.getResp().getWriter();
			out.print(content);
			out.flush();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			try {
				if (out != null)
					out.close();
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
			}
			out = null;
		}

	}
}