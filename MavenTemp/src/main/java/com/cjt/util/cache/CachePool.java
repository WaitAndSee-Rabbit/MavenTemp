package com.cjt.util.cache;

import org.apache.log4j.Logger;

public class CachePool {
	private static final Logger log = Logger.getLogger(CachePool.class);

	private CacheListener pool = null;

	/**
	 * 配置缓冲池
	 * 
	 * @param pool
	 */
	public CachePool(CacheListener pool) {
		this.pool = pool;
	}

	/**
	 * 添加数据
	 * 
	 * @param key
	 * @param obj
	 * @return
	 */
	public boolean add(String key, Object obj) {
		boolean bln = false;
		try {
			bln = pool.put(key, (CacheListenerFun) obj);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return bln;
	}

	/**
	 * 获取数据
	 * 
	 * @param key
	 * @return
	 */
	public Object get(String key) {
		Object obj = null;
		try {
			obj = pool.get(key);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return obj;
	}

	/**
	 * 删除数据
	 * 
	 * @param key
	 * @return
	 */
	public boolean del(String key) {
		boolean bln = false;
		try {
			pool.remove(key);
			bln = true;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return bln;
	}

	/**
	 * 更新数据
	 * 
	 * @param key
	 * @param obj
	 * @return
	 */
	public boolean replace(String key, Object obj) {
		boolean bln = false;
		try {
			pool.put(key, (CacheListenerFun) obj);
			bln = true;
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return bln;
	}

	/**
	 * 清除所有数据
	 * 
	 * @return
	 */
	public boolean flushAll() {
		boolean bln = false;
		try {
			pool.clear();
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
		return bln;
	}
}
