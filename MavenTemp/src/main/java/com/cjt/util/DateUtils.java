package com.cjt.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {

	/**
	 * 获得date - days（天数）的日期
	 * @param date
	 * @param days
	 * @return
	 */
	public static Date computeDateByDays(Date date,int days){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int day = calendar.get(Calendar.DATE);
		calendar.set(Calendar.DATE, day-days);
		date = calendar.getTime();
		return date;
	}
	/**
	 * 按指定格式格式化日期
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String formartDate(Date date,String pattern){
		DateFormat dateFormat = new SimpleDateFormat(pattern);
		String tmp = dateFormat.format(date);
		return tmp;
	}
	/**
	 * 按默认格式（yyyy-MM-dd HH:mm:ss）格式化日期
	 * @param date
	 * @return
	 */
	public static String formartDate(Date date){
		String pattern = "yyyy-MM-dd HH:mm:ss";
		return formartDate(date, pattern);
	}
	/**
	 * 解析字符型日期
	 * @param date
	 * @param pattern
	 * @return
	 * @throws ParseException
	 */
	public static Date parseDate(String date,String pattern) throws ParseException{
		DateFormat dateFormat = new SimpleDateFormat(pattern);
		return dateFormat.parse(date);
	}
	/**
	 * 解析字符型日期
	 * @param date
	 * @param pattern
	 * @return
	 * @throws ParseException
	 */
	public static Date parseDate(String date) throws ParseException{
		return parseDate(date, "yyyy-MM-dd HH:mm:ss");
	}
	
	/**
	 * 计算时间
	 * @param target
	 * @param days
	 * @return
	 */
	public static Date computeAfterDays(Date target, int days){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(target);
		calendar.add(Calendar.DATE, days);
		return calendar.getTime();
	}
	
	/**
	 * 设置时间
	 * @param target
	 * @param hours
	 * @param minute
	 * @param second
	 * @return
	 */
	public static Date setTime(Date target,int hours,int minute,int second){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(target);
		calendar.set(Calendar.HOUR_OF_DAY, hours);
		calendar.set(Calendar.MINUTE, minute);
		calendar.set(Calendar.SECOND, second);
		return calendar.getTime();
	}
	
	/**
	 * 时间加减
	 * @param targer
	 * @param type
	 * @param num
	 * @return
	 */
	public static Date addTime(Date targer,int type,int num){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(targer);
		calendar.add(type, num);
		return calendar.getTime();
	}
	
	public static void main(String[] args) throws ParseException {
		//System.err.println(DateUtils.formartDate(new Date(), "yyyy-MM-dd HH:mm:ss"));
		//2012-06-20 11:48:47
		System.err.println(DateUtils.parseDate("2012-06-20 11:48:47"));
		System.err.println(addTime(new Date(),Calendar.HOUR_OF_DAY,5));
	}
}
