package com.cjt.util;

import java.util.HashMap;
import java.util.Map;

public class MapDistanceUtils {
	public static final Map<String, Integer> ratioMap = new HashMap<String, Integer>();

	/**
	 * 计算两个点的真实距离（单位米）
	 * @param lat1
	 * @param lat2
	 * @param lon1
	 * @param lon2
	 * @return
	 */
	public static double getDistance(double lat1, double lat2, double lon1,
			double lon2) {
		double R = 6371;
		double distance = 0.0;
		double dLat = (lat2 - lat1) * Math.PI / 180;
		double dLon = (lon2 - lon1) * Math.PI / 180;
		double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
				+ Math.cos(lat1 * Math.PI / 180)
				* Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2)
				* Math.sin(dLon / 2);
		distance = (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * R;
		return distance;
	}

	/**
	 * 按比例尺计算距离
	 * @param ratio - 比例
	 * @param distance
	 * @return
	 */
	public static double getDistanceByRatio(int ratio, double distance){
		return distance / ratio;
	}
	
	/**
	 * 按比例尺计算距离
	 * @param ratio - 比例
	 * @param distance
	 * @return
	 */
	public static double getDistanceByRatio(double ratio, double distance){
		return distance / ratio;
	}
	
	/**
	 * 按比例尺计算距离
	 * @param ratio - 比例
	 * @param lat1
	 * @param lat2
	 * @param lon1
	 * @param lon2
	 * @return
	 */
	public static double getDistanceByRatio(int ratio, double lat1, double lat2, double lon1,
			double lon2){
		double distance = MapDistanceUtils.getDistance(lat1, lat2, lon1, lon2);
		distance = distance / ratio;
		return distance;
	}
	
	/**
	 * 按比例尺计算距离
	 * @param ratio - 比例
	 * @param lat1
	 * @param lat2
	 * @param lon1
	 * @param lon2
	 * @return
	 */
	public static double getDistanceByRatio(double ratio, double lat1, double lat2, double lon1,
			double lon2){
		double distance = MapDistanceUtils.getDistance(lat1, lat2, lon1, lon2);
		distance = distance / ratio;
		return distance;
	}
	
	public static void main(String[] args) {
		double lon1=116.416485,lat1=39.995421;
		double lon2=121.633530,lat2=38.919052;
		double lon3=119.02500749999999,lat3=39.4572365;
		System.err.println(MapDistanceUtils.getDistance(lat1, lat2, lon1, lon2));
		System.err.println(MapDistanceUtils.getDistance(lat1, lat3, lon1, lon3));
		System.err.println(MapDistanceUtils.getDistance(lat2, lat3, lon2, lon3));
		
		/*0:116.416485,39.995421
		1:121.633530,38.919052
		2:119.02500749999999,39.4572365*/
	}
}
