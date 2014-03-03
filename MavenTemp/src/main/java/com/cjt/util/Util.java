package com.cjt.util;

import com.cjt.util.bean.Point;

public class Util {
    
	public boolean pointInFences(Point pnt1, Point[] fencePnts) {
		int j = 0, cnt = 0;
		for (int i = 0; i < fencePnts.length; i++) {
			j = (i == fencePnts.length - 1) ? 0 : j + 1;
			if ((fencePnts[i].getY() != fencePnts[j].getY())
					&& (((pnt1.getY() >= fencePnts[i].getY()) && (pnt1.getY() < fencePnts[j]
							.getY())) || ((pnt1.getY() >= fencePnts[j].getY()) && (pnt1
							.getY() < fencePnts[i].getY())))
					&& (pnt1.getX() < (fencePnts[j].getX() - fencePnts[i]
							.getX())
							* (pnt1.getY() - fencePnts[i].getY())
							/ (fencePnts[j].getY() - fencePnts[i].getY())
							+ fencePnts[i].getX()))
				cnt++;
		}
		return (cnt % 2 > 0) ? true : false;
	}
    //根据圆点，半径 确定 某一点是否在园内 
	public boolean fun(Point center, Point point, double r) {
		double xx=gps2m(center.getY(),center.getX(),point.getY(),point.getX());
		if (r > xx) {
			return true;
		} else {
			return false;
		}
	}
	//根据经纬度计算两点之间的距离
	private double gps2m(double lat_a, double lng_a, double lat_b, double lng_b) {  
	       double radLat1 = (lat_a * Math.PI / 180.0);  
	       double radLat2 = (lat_b * Math.PI / 180.0);  
	       double a = radLat1 - radLat2;  
	       double b = (lng_a - lng_b) * Math.PI / 180.0;  
	       double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)  
	              + Math.cos(radLat1) * Math.cos(radLat2)  
	              * Math.pow(Math.sin(b / 2), 2)));  
	       s = s * 6378137;  
	       s = Math.round(s * 10000) / 10000;  
	       return s;  
	    } 
}
