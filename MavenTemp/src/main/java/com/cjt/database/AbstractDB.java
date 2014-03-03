package com.cjt.database;


import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;

public abstract class AbstractDB {
	private static final Logger log = Logger.getLogger(AbstractDB.class);
	private SqlSessionTemplate session;
	private SqlSessionTemplate sessionHeart;
	
	public SqlSessionTemplate getSession() {
		return session;
	}
	public void setSession(SqlSessionTemplate session) {
		this.session = session;
	}
	public SqlSessionTemplate getSessionHeart() {
		return sessionHeart;
	}
	public void setSessionHeart(SqlSessionTemplate sessionHeart) {
		this.sessionHeart = sessionHeart;
	}
	

}
