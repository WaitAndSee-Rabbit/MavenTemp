package com.cjt.page;

import java.util.ArrayList;
import java.util.List;

/**
 * 分页组件(包含当前页结果数据列表和总记录数) 注意，它不是持久化实体类
 * 
 */
public class PageModel<T> {
	private Integer recordCount;
	private List<T> datas = new ArrayList<T>();
	private Integer pageNo = 1;
	private Integer pageSize = 10;

	public Integer getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(Integer recordCount) {
		this.recordCount = recordCount;
	}

	public List<T> getDatas() {
		return datas;
	}

	public void setDatas(List<T> datas) {
		this.datas = datas;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getStart() {
		return (pageNo - 1) * pageSize;
	}

	public Integer getEnd() {
		return (pageNo - 1) * pageSize + pageSize;
	}

	@Override
	public String toString() {
		return "PageModel [datas=" + datas + ", pageNo=" + pageNo
				+ ", pageSize=" + pageSize + ", recordCount=" + recordCount
				+ "]";
	}

}
