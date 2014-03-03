package com.cjt.util.bean;

public class Point {
    public double x;
    public double y;
    
    public Point() {
        super();
    }
    
    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }
    
    public Point(String pointStr) {
        if(null != pointStr && !pointStr.isEmpty()) {
            double TempX = Double.parseDouble(pointStr.split(",")[0]);
            double TempY = Double.parseDouble(pointStr.split(",")[1]);
            this.x = Math.floor(TempX*10E4);
            this.y = Math.floor(TempY*10E4);
        }
    }
    
    public double getX() {
        return x;
    }
    public void setX(double x) {
        this.x = x;
    }
    public double getY() {
        return y;
    }
    public void setY(double y) {
        this.y = y;
    }

    @Override
    public String toString() {
        return "Point [x=" + x + ", y=" + y + "]";
    }
    
    
}
