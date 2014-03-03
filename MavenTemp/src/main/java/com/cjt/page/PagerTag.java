package com.cjt.page;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

/**
 * 分页标签处理类
 */
public class PagerTag extends TagSupport {
	private static final long serialVersionUID = 5729832874890369508L;
	private String url; // 请求URI
	private int pageSize = 10;// 每页要显示的记录数
	private int pageNo = 1; // 当前页号
	private int recordCount; // 总记录数
	private String functionName;//onclick函数
	private String turnPageNoId = "inputpage";
    private int showFlag=1;
	@SuppressWarnings("unchecked")
	public int doStartTag() throws JspException {
		int pageCount = (recordCount + pageSize - 1) / pageSize; // 计算总页数

		// 拼写要输出到页面的HTML文本
		StringBuffer sb = new StringBuffer();
		if (recordCount == 0) {
			sb.append("<strong>没有可显示的项目</strong>\r\n");
		} else {
			// 页号越界处理
			if (pageNo > pageCount) {
				pageNo = pageCount;
			}
			if (pageNo < 1) {
				pageNo = 1;
			}

			// 获取请求中的所有参数
			HttpServletRequest request = (HttpServletRequest) pageContext
					.getRequest();
			Enumeration<String> enumeration = request.getParameterNames();
			String name = null; // 参数名
			String value = null; // 参数值
			// 把请求中的所有参数当作隐藏表单域
			while (enumeration.hasMoreElements()) {
				name = enumeration.nextElement();
				value = request.getParameter(name);
				// 去除页号
				if ("pageNo".equals(name)) {
					if (null != value && !"".equals(value)) {
						pageNo = Integer.parseInt(value);
					}
					continue;
				}
				sb.append("<input type=\"hidden\" id=\"").append(name)
						.append("\" value=\"").append(value).append("\"/>\r\n");
			}

			// 把当前页号设置成请求参数
			sb.append("<input type=\"hidden\" name=\"").append("pageNo")
					.append("\" value=\"").append(pageNo).append("\"/>\r\n");


			// 上一页处理
			if (pageNo == 1) {
				sb.append("<span class=\"disabled\">&laquo;&nbsp;上一页").append(
						"</span>\r\n");
			} else {
				sb.append("<a href=\"javascript:"+functionName+"(")
						.append((pageNo - 1))
						.append(")\">&laquo;&nbsp;上一页</a>\r\n");
			}
			if(showFlag==1){
				// 如果前面页数过多,显示"..."
				int start = 1;
				if (this.pageNo > 4) {
					start = this.pageNo - 1;
					sb.append("<a href=\"javascript:"+functionName+"(1)\">1</a>\r\n");
					sb.append("<a href=\"javascript:"+functionName+"(2)\">2</a>\r\n");
					sb.append("&hellip;\r\n");
				}
				// 显示当前页附近的页
				int end = this.pageNo + 1;
				if (end > pageCount) {
					end = pageCount;
				}
				for (int i = start; i <= end; i++) {
					if (pageNo == i) { // 当前页号不需要超链接
						sb.append("<span class=\"current\">").append(i)
						.append("</span>\r\n");
					} else {
						sb.append("<a href=\"javascript:"+functionName+"(").append(i)
						.append(")\">").append(i).append("</a>\r\n");
					}
				}
				// 如果后面页数过多,显示"..."
				if (end < pageCount - 2) {
					sb.append("&hellip;\r\n");
				}
				if (end < pageCount - 1) {
					sb.append("<a href=\"javascript:"+functionName+"(")
					.append(pageCount - 1).append(")\">")
					.append(pageCount - 1).append("</a>\r\n");
				}
				if (end < pageCount) {
					sb.append("<a href=\"javascript:"+functionName+"(")
					.append(pageCount).append(")\">").append(pageCount)
					.append("</a>\r\n");
				}
			}

			// 下一页处理
			if (pageNo == pageCount) {
				sb.append("<span class=\"disabled\">下一页&nbsp;&raquo;").append(
						"</span>\r\n");
			} else {
				sb.append("<a href=\"javascript:"+functionName+"(")
						.append((pageNo + 1))
						.append(")\">下一页&nbsp;&raquo;</a>\r\n");
			}

			// 输出统计数据
			sb.append("&nbsp;&nbsp;&nbsp;共<strong>").append(recordCount)
					.append("</strong>条记录").append(",<strong>").append(pageCount)
					.append("</strong>页&nbsp;\r\n");
			
			//跳向指定页
			sb.append("&nbsp;&nbsp;&nbsp;<input type=\"text\" size=\"3\" id=\""+turnPageNoId+"\" value=\""+pageNo
					+"\" " +
			"onkeydown=\"return event.keyCode&gt;=48&amp;&amp;event.keyCode&lt;=57 || event.keyCode == 8 || event.keyCode&gt;=95&amp;&amp;event.keyCode&lt;=105\" /> ");
			sb.append("&nbsp;<a href=\"javascript:"+functionName+"(")
			.append("document.getElementById('"+turnPageNoId+"').value == '' || document.getElementById('"+turnPageNoId+"').value == 0 ? 1 : document.getElementById('"+turnPageNoId+"').value > "+pageCount +"?"+pageCount+":document.getElementById('"+turnPageNoId+"').value ")
			.append(")\">GO</a>\r\n");
			
		}

		// 把生成的HTML输出到响应中
		try {
			pageContext.getOut().println(sb.toString());
		} catch (IOException e) {
			throw new JspException(e);
		}
		return SKIP_BODY; // 本标签主体为空,所以直接跳过主体
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public void setPageSize(int pageSize) {
		if (pageSize<1){
			this.pageSize = 10;
			return;
		}
		this.pageSize = pageSize;
	}

	public void setPageNo(int pageNo) {
		if (pageNo<1){
			this.pageNo = 1;
			return;
		}
		this.pageNo = pageNo;
	}

	public void setRecordCount(int recordCount) {
		if (recordCount<0){
			this.recordCount = 0;
			return;
		}
		this.recordCount = recordCount;
	}

	public void setFunctionName(String functionName) {
		this.functionName = functionName;
	}

	public void setTurnPageNoId(String turnPageNoId) {
		this.turnPageNoId = turnPageNoId;
	}

	public int getShowFlag() {
		return showFlag;
	}

	public void setShowFlag(int showFlag) {
		this.showFlag = showFlag;
	}
	
	
}