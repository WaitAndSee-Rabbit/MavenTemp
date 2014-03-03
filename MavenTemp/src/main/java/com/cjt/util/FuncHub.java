package com.cjt.util;

import com.cjt.util.bean.Point;

public class FuncHub {
	
	/**
	 *  calculate two lines intersection
	 * @param points_1
	 * @param x_step_1
	 * @param y_step_1
	 * @param points_2
	 * @param x_step_2
	 * @param y_step_2
	 * @return
	 */
	public static Point line_lineIntersect(Point points_1, double x_step_1,
			double y_step_1, Point points_2, double x_step_2, double y_step_2) {
		Point interPoints = new Point();
		Point doublePt = new Point();
		double floatValue = 0.1f;

		if (x_step_1 * y_step_2 == x_step_2 * y_step_1) {
			interPoints.x = points_2.x;
			interPoints.y = points_2.y;
			return interPoints;
		}

		if (x_step_1 == 0)// line_1 vertical2
		{
			doublePt.x = points_1.x;
			if (Math.abs(x_step_2) < Math.abs(y_step_2 * floatValue)) {
				doublePt.y = points_2.y;
			} else {
				doublePt.y = y_step_2 * (doublePt.x - points_2.x) / x_step_2
						+ points_2.y;
			}
		} else if (x_step_2 == 0)// line_2 vertical
		{
			doublePt.x = points_2.x;
			if (Math.abs(x_step_1) < Math.abs(y_step_1 * floatValue)) {
				doublePt.y = points_2.y;
			} else {
				doublePt.y = y_step_1 * (doublePt.x - points_1.x) / x_step_1
						+ points_1.y;
			}
		} else if (y_step_1 == 0)// line_1 horizon
		{
			doublePt.y = points_1.y;
			if (Math.abs(y_step_2) < Math.abs(x_step_2 * floatValue)) {
				doublePt.x = points_2.x;
			} else {
				doublePt.x = x_step_2 * (doublePt.y - points_2.y) / y_step_2
						+ points_2.x;
			}
		} else if (y_step_2 == 0)// line_2 horizon
		{
			doublePt.y = points_2.y;
			if (Math.abs(y_step_1) < Math.abs(x_step_1 * floatValue)) {
				doublePt.x = points_2.x;
			} else {
				doublePt.x = x_step_1 * (doublePt.y - points_1.y) / y_step_1
						+ points_1.x;
			}
		} else {
			doublePt.x = (double) (x_step_1
					* (x_step_2 * points_2.y - y_step_2 * points_2.x) + x_step_2
					* (y_step_1 * points_1.x - x_step_1 * points_1.y))
					/ (x_step_2 * y_step_1 - x_step_1 * y_step_2);
			doublePt.y = y_step_2 * (doublePt.x - points_2.x) / x_step_2
					+ points_2.y;
		}

		/*
		 * interPoints->x = (int)(doublePt.x + 0.5); interPoints->y =
		 * (int)(doublePt.y + 0.5);
		 */

		interPoints.x = doublePt.x;
		interPoints.y = doublePt.y;

		return interPoints;
	}
	
	/**
	 * 
	 * @param fPoints
	 * @param pntCount
	 * @param fWidth
	 * @param retPoly
	 */
	public static void polyline_verticalMove(Point[] fPoints, int pntCount,
			double fWidth, Point[] retPoly) {
		Point roadBufPoly = null;
		double sinValue = 0.0;
		double cosValue = 0.0;
		double sqrtValue = 0;
		double x_dist = 0;
		double y_dist = 0;
		int i = 0;

		if (pntCount < 2) {
			return;
		}
		if (fPoints == null || fPoints.length == 0) {
			return;
		}
		if (retPoly == null || retPoly.length == 0) {
			return;
		}

		// first
		x_dist = fPoints[i].x - fPoints[i + 1].x;
		y_dist = fPoints[i].y - fPoints[i + 1].y;
		sqrtValue = Math.sqrt((double) x_dist * (double) x_dist
				+ (double) y_dist * (double) y_dist);
		sinValue = x_dist / sqrtValue;
		cosValue = y_dist / sqrtValue;

		retPoly[i].x = fPoints[i].x + fWidth * cosValue / 2;
		retPoly[i].y = fPoints[i].y - fWidth * sinValue / 2;
		retPoly[(pntCount << 1) - i - 1].x = retPoly[i].x - fWidth * cosValue;
		retPoly[(pntCount << 1) - i - 1].y = retPoly[i].y + fWidth * sinValue;

		// middle
		for (i = 0; i < pntCount - 2; i++) {
			double x_dist_1 = 0;
			double y_dist_1 = 0;
			double x_dist_2 = 0;
			double y_dist_2 = 0;
			Point ptFirst_1 = new Point();
			Point ptSceond_1 = new Point();
			Point ptFirst_2 = new Point();
			Point ptSceond_2 = new Point();

			x_dist_1 = fPoints[i].x - fPoints[i + 1].x;
			y_dist_1 = fPoints[i].y - fPoints[i + 1].y;
			sqrtValue = Math.sqrt((double) x_dist_1 * (double) x_dist_1
					+ (double) y_dist_1 * (double) y_dist_1);
			sinValue = x_dist_1 / sqrtValue;
			cosValue = y_dist_1 / sqrtValue;

			ptFirst_1.x = fPoints[i].x + fWidth * cosValue / 2;
			ptFirst_1.y = fPoints[i].y - fWidth * sinValue / 2;
			ptFirst_2.x = ptFirst_1.x - fWidth * cosValue;
			ptFirst_2.y = ptFirst_1.y + fWidth * sinValue;

			x_dist_2 = fPoints[i + 1].x - fPoints[i + 2].x;
			y_dist_2 = fPoints[i + 1].y - fPoints[i + 2].y;
			sqrtValue = Math.sqrt((double) x_dist_2 * (double) x_dist_2
					+ (double) y_dist_2 * (double) y_dist_2);
			sinValue = x_dist_2 / sqrtValue;
			cosValue = y_dist_2 / sqrtValue;

			ptSceond_1.x = fPoints[i + 1].x + fWidth * cosValue / 2;
			ptSceond_1.y = fPoints[i + 1].y - fWidth * sinValue / 2;
			ptSceond_2.x = ptSceond_1.x - fWidth * cosValue;
			ptSceond_2.y = ptSceond_1.y + fWidth * sinValue;

			retPoly[i + 1] = line_lineIntersect(ptFirst_1, x_dist_1, y_dist_1,
					ptSceond_1, x_dist_2, y_dist_2);
			retPoly[pntCount * 2 - i - 2] = line_lineIntersect(ptFirst_2,
					x_dist_1, y_dist_1, ptSceond_2, x_dist_2, y_dist_2);
		}

		// last
		retPoly[i + 1].x = fPoints[i + 1].x + fWidth * cosValue / 2;
		retPoly[i + 1].y = fPoints[i + 1].y - fWidth * sinValue / 2;
		retPoly[(pntCount << 1) - i - 2].x = retPoly[i + 1].x - fWidth
				* cosValue;
		retPoly[(pntCount << 1) - i - 2].y = retPoly[i + 1].y + fWidth
				* sinValue;
	}
	
	/**
	 * 
	 * @param points
	 * @param pntCount
	 * @param width
	 * @return
	 */
	public static Point[] Arrow_getOutlinePts(Point[] points, int pntCount,
			int width) {
		int retPtNUm = 0;
		Point[] polylinePts = null;
		Point[] fPolylinePts = null;
		Point[] filterPoints = new Point[pntCount];
		for (int index = 0; index < filterPoints.length; index++) {
			filterPoints[index] = new Point();
		}

		int i = 0;
		int j = 0;
		Point[] fPoints = new Point[pntCount];
		for (int index = 0; index < fPoints.length; index++) {
			fPoints[index] = new Point();
		}

		double fWidth;

		if (points == null || points.length == 0) {
			return null;
		}
		if (pntCount < 1) {
			return null;
		}
		// if (width < 1) {return NULL;}

		fWidth = (double) width / 100000;

		for (i = 0; i < pntCount; i++) {
			fPoints[i].x = ((double) points[i].x) / 100000;
			fPoints[i].y = ((double) points[i].y) / 100000;
		}

		// filter same points
		filterPoints[0] = fPoints[0];
		/*
		 * filterPoints[0].x = fPoints[0].x; filterPoints[0].y = fPoints[0].y;
		 */
		for (i = 1; i < pntCount; i++) {
			if (filterPoints[j].x == fPoints[i].x
					&& filterPoints[j].y == fPoints[i].y) {
				continue;
			}
			filterPoints[++j] = fPoints[i];
		}

		// refill points array
		fPoints = new Point[pntCount];
		for (int index = 0; index < fPoints.length; index++) {
			fPoints[index] = new Point();
		}
		System.arraycopy(filterPoints, 0, fPoints, 0, ++j);

		pntCount = j;
		retPtNUm = pntCount * 2;
		polylinePts = new Point[retPtNUm];
		for (int index = 0; index < polylinePts.length; index++) {
			polylinePts[index] = new Point();
		}
		fPolylinePts = new Point[retPtNUm];
		for (int index = 0; index < fPolylinePts.length; index++) {
			fPolylinePts[index] = new Point();
		}

		polyline_verticalMove(fPoints, pntCount, fWidth, fPolylinePts);

		filterPoints = null;

		for (i = 0; i < retPtNUm; i++) {
			polylinePts[i].x = (int) (fPolylinePts[i].x * 100000 + 0.5);
			polylinePts[i].y = (int) (fPolylinePts[i].y * 100000 + 0.5);
		}
		fPolylinePts = null;

		fPoints = null;
		return polylinePts;
	}

	/**
	 * 主函数
	 * 
	 * @param args
	 */
	public static void main(String[] args) {

		// 116.33468274947002,39.9345430314023;116.32355774947001,39.9326055314023;

		Point p1 = new Point();
		p1.setX(11632574);
		p1.setY(3993241);
		Point p2 = new Point();
		p2.setX(11633349);
		p2.setY(3993235);
		Point p3 = new Point();
		p3.setX(11633468);
		p3.setY(3992310);

		Point[] ps = Arrow_getOutlinePts(new Point[] { p1, p2, p3 }, 3, 10);
		for (Point p : ps) {
			System.out.println(p.getX() + "=====" + p.getY());
		}
	}
}
