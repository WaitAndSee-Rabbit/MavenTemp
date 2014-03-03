package com.cjt.util;

import com.cjt.util.cache.CacheListener;
import com.cjt.util.cache.CachePool;


public class CacheList {
	//缓冲刻呼信息
	public static CachePool CACHE_USER = new CachePool(new CacheListener(
			1024 * 1024));
}
