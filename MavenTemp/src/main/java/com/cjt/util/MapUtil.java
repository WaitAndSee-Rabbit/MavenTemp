package com.cjt.util;

import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;

public class MapUtil {

	private static Logger logger = Logger.getLogger(MapUtil.class);
	private static double mapHeight = 1070;//（zoom=14,比例=100米时地图高度。单位：米）
	
	/**
	 * 计算google地图显示参数
	 * @param points
	 * @return
	 */
	public static Map<String, Object> computeGoogleMapShowPara(String points){
		Map<String,Object> googleParam = new HashMap<String, Object>();
		Map<String,Object> params = new HashMap<String, Object>();
		double maxX = 0.0;
		double maxY = 0.0;
		double minX = 1000.0;
		double minY = 1000.0;
		
		try{
			String[] pointArray = points.split(";");
			
			if(pointArray.length == 1){
				return googleParam;
			}
			
			for (String laln:pointArray) {
				double x = Double.parseDouble(laln.split(",")[0]);
				double y = Double.parseDouble(laln.split(",")[1]);
				
				if (x > maxX){
					maxX = x;
				}
				
				if(x < minX){
					minX = x;
				}
				
				if (y > maxY){
					maxY = y;
				}
				if(y < minY){
					minY = y;
				}
			}
			params.put("maxX", maxX);
			params.put("maxY", maxY);
			params.put("minX", minX);
			params.put("minY", minY);
			
			googleParam.put("zoom", params);
		}catch(Exception e){
			logger.error(e.getMessage(),e);
		}
		return googleParam;
	}
	
	
	/**
	 * 计算地图显示参数
	 * @param points
	 * @return
	 */
	public static Map<String, Object> computeCjtMapShowPara(String points){
		Map<String,Object> cjtMapParam = new HashMap<String, Object>();
		double r = 0.0;
		double centerPostY  = 0.0;
		double centerPostX  = 0.0;
		
		double totalPostX  = 0.0;
		double totalPostY  = 0.0;
		int i = 0; 
		String[] pointArray = points.split(";");
		for (;i < pointArray.length; i++) {
			totalPostX += Double.parseDouble(pointArray[i].split(",")[0]);
			totalPostY += Double.parseDouble(pointArray[i].split(",")[1]);
		}
		centerPostX = totalPostX/i;
		centerPostY = totalPostY/i;
		int zoom = 14;
		
		cjtMapParam.put("centerPostX", centerPostX);
		cjtMapParam.put("centerPostY", centerPostY);
		
		r = computeMaxDistance(centerPostY, centerPostX, points);//真实距离
		double key = 2*r/mapHeight;
		
		if (key <= 1){
			zoom = 14;
		}else if (key <= 2){
			zoom = 13;
		}else if (key <= 5){
			zoom = 12;
		}else if (key <= 10){
			zoom = 11;
		}else if (key <= 20){
			zoom = 10;
		}else if (key <= 50){
			zoom = 9;
		}else if (key <= 100){
			zoom = 8;
		}else if (key <= 200){
			zoom = 7;
		}else if (key <= 500){
			zoom = 6;
		}else if (key <= 1000){
			zoom = 5;
		}else if (key <= 2000){
			zoom = 4;
		}else if (key <= 2500){
			zoom = 3;
		}else if (key <= 4000){
			zoom = 2;
		}else if (key <= 7000){
			zoom = 1;
		}else{
			zoom = 0;
		}
		cjtMapParam.put("zoom", zoom);
		
		return cjtMapParam;
	}
	/**
	 * 查找并计算中心点到最远点的距离
	 * @param centerPostY
	 * @param centerPostX
	 * @param points
	 * @return
	 */
	private static double computeMaxDistance(double centerPostY,double centerPostX,String points){
		double maxDistance  = 0.0;//最大距离
		double postY  = 0.0;
		double postX  = 0.0;
		int i = 0; 
		String[] pointArray = points.split(";");
		for (;i < pointArray.length; i++) {
			postX = Double.parseDouble(pointArray[i].split(",")[0]);
			postY = Double.parseDouble(pointArray[i].split(",")[1]);
			double tmp = MapDistanceUtils.getDistance(centerPostY, postY, centerPostX, postX);
			if (tmp > maxDistance){
				maxDistance = tmp;
			}
		}
		return maxDistance*1000;
	}
}
