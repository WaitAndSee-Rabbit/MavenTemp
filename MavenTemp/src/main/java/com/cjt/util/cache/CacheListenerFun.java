package com.cjt.util.cache;

/**
 * Description: 定义对象被抛弃和池被清空的事件接口
 * 
 */
public interface CacheListenerFun {
	/**
	 * 对象被抛弃
	 */
	public void onAbandon();

	/**
	 * 对象被清空
	 */
	public void poolClear();
}