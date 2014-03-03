package com.cjt.util.code;

import java.security.MessageDigest;

import org.apache.log4j.Logger;

public class MD5 {
	private static final Logger log = Logger.getLogger(MD5.class);
	
	private static final String ECODE_PRE="MD5_";
	private final static String[] hexDigits = { "0", "1", "2", "3", "4", "5",
			"6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };


	public static String byteArrayToHexString(byte[] b) {
		StringBuffer resultSb = new StringBuffer();
		for (int i = 0; i < b.length; i++) {
			resultSb.append(byteToHexString(b[i]));
		}
		return resultSb.toString();
	}

	private static String byteToHexString(byte b) {
		int n = b;
		if (n < 0)
			n = 256 + n;
		int d1 = n / 16;
		int d2 = n % 16;
		return hexDigits[d1] + hexDigits[d2];
	}

	public static String Encode(String origin) {
		String resultString = null;
		try {
			resultString = new String(origin);
			MessageDigest md = MessageDigest.getInstance("MD5");
			resultString = byteArrayToHexString(md.digest(resultString
					.getBytes()));
			resultString = ECODE_PRE+resultString.toUpperCase();
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return resultString;
	}

	public static void main(String[] args) {
		log.info(Encode("root123"));
	}
}
