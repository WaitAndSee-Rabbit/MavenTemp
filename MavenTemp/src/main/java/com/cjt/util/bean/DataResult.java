package com.cjt.util.bean;

import java.io.Serializable;
import java.util.List;

/**
 * 纪录操作过程中的信息，并返回数据集
 * 
 * @author Administrator
 * 
 */
public class DataResult implements Serializable {
	private static final long serialVersionUID = -2048364398290257657L;

	// 中间操作信息
	private String Info = null;

	// 中间操作信息
	private StringBuffer sbInfo = null;

	// 是否操作成功
	private boolean bln = false;

	// 结果集纪录数量
	private int Count = 0;

	// 翻页用的总页数
	private int pageCount = 0;

	// 返回的结果集
	private List resultdate = null;
	// 返回单个对象
	private Object obj = null;

	public DataResult() {
		bln = false;
	}

	public boolean isBln() {
		return bln;
	}

	public void setBln(boolean bln) {
		this.bln = bln;
	}

	public int getCount() {
		return Count;
	}

	public void setCount(int count) {
		Count = count;
	}

	public String getInfo() {
		return Info;
	}

	public void setInfo(String info) {
		Info = info;
	}

	public List getResultdate() {
		return resultdate;
	}

	public void setResultdate(List resultdate) {
		this.resultdate = resultdate;
	}

	public StringBuffer getSbInfo() {
		return sbInfo;
	}

	public void setSbInfo(StringBuffer sbInfo) {
		this.sbInfo = sbInfo;
	}

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

}
