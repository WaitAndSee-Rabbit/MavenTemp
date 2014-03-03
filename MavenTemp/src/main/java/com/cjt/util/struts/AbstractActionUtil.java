package com.cjt.util.struts;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings({ "unused", "serial" })
public abstract class AbstractActionUtil extends ActionSupport implements
		ServletRequestAware, ServletResponseAware{
	
	private static final Logger logger = Logger.getLogger(AbstractActionUtil.class);

	private HttpServletRequest req;
	private HttpServletResponse resp;

	public void setServletResponse(HttpServletResponse response) {
		this.resp = response;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.req = request;
	}


	public HttpServletResponse getResp() {
		return resp;
	}

	public HttpServletRequest getReq() {
		return req;
	}

}