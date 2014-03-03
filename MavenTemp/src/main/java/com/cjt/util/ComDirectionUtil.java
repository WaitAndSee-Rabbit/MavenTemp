package com.cjt.util;

/**
 * 计算方向的工具类
 * 
 * @author Administrator
 * 
 */
public class ComDirectionUtil {

	/**
	 * 计算方向
	 * 
	 * @param simplDirection
	 * @return
	 */
	public static String computeDirection(int direction) {

		StringBuffer sb = new StringBuffer();
		if (direction >= 338 || direction < 23) {
			sb.append("北");
			sb.append(";");
			sb.append("b.png");
		} else if (direction >= 23 && direction < 68) {
			sb.append("东北");
			sb.append(";");
			sb.append("db.png");
		} else if (direction >= 68 && direction < 113) {
			sb.append("东");
			sb.append(";");
			sb.append("d.png");
		} else if (direction >= 113 && direction < 158) {
			sb.append("东南");
			sb.append(";");
			sb.append("dn.png");
		} else if (direction >= 158 && direction < 203) {
			sb.append("南");
			sb.append(";");
			sb.append("n.png");
		} else if (direction >= 203 && direction < 248) {
			sb.append("西南");
			sb.append(";");
			sb.append("xn.png");
		} else if (direction >= 248 && direction < 293) {
			sb.append("西");
			sb.append(";");
			sb.append("x.png");
		} else if (direction >= 293 && direction < 338) {
			sb.append("西北");
			sb.append(";");
			sb.append("xb.png");
		}
		return sb.toString();
	}
}
