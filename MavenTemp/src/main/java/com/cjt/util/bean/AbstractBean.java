package com.cjt.util.bean;

import java.io.Serializable;

import com.cjt.util.cache.CacheListenerFun;


public abstract class AbstractBean implements Serializable,CacheListenerFun{

	public void onAbandon() {
       		
	}

	public void poolClear() {
	}

}
