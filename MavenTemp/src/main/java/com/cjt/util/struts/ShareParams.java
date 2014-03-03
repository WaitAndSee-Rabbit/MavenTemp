package com.cjt.util.struts;

import java.util.HashMap;
import java.util.Iterator;
import org.apache.log4j.Logger;

import com.cjt.util.code.UrlCode;


public class ShareParams {
	private static final Logger log = Logger.getLogger(ShareParams.class);

	/**
	 * 加密sid
	 * 
	 * @param hm
	 * @return
	 */
	public static String encodeSID(HashMap hm) {
		String str = "";
		try {
			Iterator iter = hm.keySet().iterator();
			while (iter.hasNext()) {
				String name = (String) iter.next();
				String value = (String) hm.get(name);
				log.info("name=" + name + ";value=" + value);
				if (str.equals(""))
					str = name + "=" + value;
				else
					str = str + "&" + name + "=" + value;
			}
			log.info("str==000==="+str);
			str = UrlCode.Encode2(str);
			log.info("str==111==="+str);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return str;
	}

	/**
	 * 解密sid
	 * 
	 * @param str
	 * @return
	 */
	public static HashMap decodeSID(String str) {
		HashMap hm = new HashMap();
		try {
			str = UrlCode.Decode2(str);
			String arg[] = str.split("&");
			for (int i = 0; i < arg.length; i++) {
				log.info("arg[" + i + "]=" + arg[i]);
				String[] aax = arg[i].split("=");
				hm.put(aax[0], aax[1]);
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return hm;
	}

	public static void main(String arg[]) {
		HashMap hm = new HashMap();
		hm.put("userid", "11111");
		hm.put("key1", "22222");
		hm.put("key2", "33333");
		String sss = encodeSID(hm);
		log.info("sss===" + sss);
		decodeSID(sss);
	}

}
