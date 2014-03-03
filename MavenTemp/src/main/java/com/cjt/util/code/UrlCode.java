package com.cjt.util.code;

import java.security.Security;
import java.util.Random;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.log4j.Logger;

public class UrlCode {
	private static final Logger log = Logger.getLogger(UrlCode.class);

	private static final String Algorithm = "DESede";// AES

	private static final byte[] keyBytes = { 0x62, 0x66, 0x4F, 0x57,
			(byte) 0xB9, 0x10, 0x40, 0x38, 0x28, 0x25, 0x79, 0x51, (byte) 0x8C,
			(byte) 0xDD, 0x55, 0x66, 0x77, 0x58, 0x74, (byte) 0x6B, 0x30, 0x40,
			0x36, (byte) 0x2F };

	/**
	 * url ����
	 * 
	 * @param str
	 * @return
	 */

	public synchronized static String Decode2(String str) {
		try {
			str = convertString(str.substring(1, str.length()));
			str = new Base64().decode(str);

			// str = new String(DecodeByAES(keyBytes,hex2byte(str)));
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return str;
	}

	public synchronized static String Decode(String str) {
		String str3 = null;
		try {
			str = str.replaceAll("_", "=");
			String str2 = Decode2(str);
			byte[] srcBytes = DecodeByAES(keyBytes, hex2byte(str2));
			str3 = new String(srcBytes);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return str3;
	}

	/**
	 * url ����
	 * 
	 * @param str
	 * @return
	 */

	public synchronized static String Encode2(String str) {
		try {

			str = new Base64().encode(str);
			str = convertString(str);
			int x = str.length();
			if (x > 3)
				x = (new Random()).nextInt(x - 3);
			str = str.charAt(x) + str;

		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return str;
	}

	public synchronized static String Encode(String str) {
		String str2 = null;
		try {
			byte[] encoded = EncodeByAES(keyBytes, str.getBytes());
			String tt = byte2hex(encoded);
			str2 = Encode2(tt);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		str2 = str2.replaceAll("=", "_");
		return str2;
	}

	public synchronized static byte[] DecodeByAES(byte[] keybyte, byte[] src) {
		// KeyGenerator kg = null;
		SecretKey key = null;
		try {
			Security.addProvider(new com.sun.crypto.provider.SunJCE());
			key = new SecretKeySpec(keybyte, Algorithm);

			Cipher cp = Cipher.getInstance(Algorithm); // ����������
			cp.init(Cipher.DECRYPT_MODE, key); // ��ʼ��
			return cp.doFinal(src);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return null;
	}

	public static byte[] EncodeByAES(byte[] keybyte, byte[] src) {
		// KeyGenerator kg = null;
		SecretKey key = null;
		try {
			Security.addProvider(new com.sun.crypto.provider.SunJCE());
			key = new SecretKeySpec(keybyte, Algorithm);

			Cipher cp = Cipher.getInstance(Algorithm); // ����������
			cp.init(Cipher.ENCRYPT_MODE, key); // ��ʼ��
			return cp.doFinal(src);

		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return null;
	}

	/**
	 * ת����Сд
	 * 
	 * @param str
	 * @return
	 */
	public static String convertString(String str) {
		StringBuffer buf = new StringBuffer(str.length());
		try {
			String upStr = str.toUpperCase();
			String lowStr = str.toLowerCase();
			for (int i = 0; i < str.length(); i++) {
				if (str.charAt(i) == upStr.charAt(i)) {
					buf.append(lowStr.charAt(i));
				} else {
					buf.append(upStr.charAt(i));
				}
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return buf.toString();
	}

	public synchronized static String converUnicodeToCN(String str) {
		StringBuffer sb = new StringBuffer();
		String tmp = "";
		String c = "";
		// char a = '&';
		for (int i = 0; i < str.length(); i++) {
			c = "" + str.charAt(i);
			if (c.equals("&")) {
				tmp = "";
				for (int j = 0; j < 8; j++) {
					tmp = tmp + str.charAt(i + j);
				}
				tmp = getCN(tmp);
				sb.append(tmp);
				i = i + 7;
			} else {
				sb.append(c.toLowerCase());
			}

		}
		return sb.toString();
	}

	public synchronized static String getCN(String str) {
		String tmp = str.replaceAll("&#", ",").replaceAll(";", "");
		String[] s2 = tmp.split(",");
		String s1 = "";
		for (int i = 1; i < s2.length; i++) {
			int a = Integer.parseInt(s2[i], 10);
			s1 = s1 + (char) a;
		}
		return s1;
	}



	public static void main(String arg[]) {
		try {
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String byte2hex(byte[] b) {
		String hs = "";
		String stmp = "";
		for (int n = 0; n < b.length; n++) {
			stmp = (java.lang.Integer.toHexString(b[n] & 0XFF));
			if (stmp.length() == 1) {
				hs = hs + "0" + stmp;
			} else {
				hs = hs + stmp;
			}
		}
		return hs.toUpperCase();
	}

	public static byte[] hex2byte(String strhex) {
		if (strhex == null) {
			return null;
		}
		int l = strhex.length();
		if (l % 2 == 1) {
			return null;
		}
		byte[] b = new byte[l / 2];
		for (int i = 0; i != l / 2; i++) {
			b[i] = (byte) Integer.parseInt(strhex.substring(i * 2, i * 2 + 2),
					16);
		}
		return b;
	}
}
