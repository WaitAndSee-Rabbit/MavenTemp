package com.cjt.util.cache;
import java.util.HashMap;
import java.util.Iterator;

import org.apache.log4j.Logger;

public class CacheListener {
	private static final Logger log = Logger.getLogger(CacheListener.class);
	/**
	 * 池对象的包裹类，这样便于相关处理
	 */
	class CacheNode {
		CacheNode prev;

		CacheNode next;

		CacheListenerFun value;

		Object key;

		public CacheNode() {
		}
	}

	/**
	 * 对象池大小
	 */
	private int cacheSize;

	/***************************************************************************
	 * 对象列表、当然可以采用泛型编程，这样就实现自动装箱、解箱(boxing/unboxing)
	 **************************************************************************/
	private HashMap nodes;

	/***************************************************************************
	 * 对象池当前对象数
	 **************************************************************************/
	private int currentSize;

	/***************************************************************************
	 * 第一个节点
	 **************************************************************************/
	private CacheNode first;

	/***************************************************************************
	 * 最后一个节点
	 **************************************************************************/
	private CacheNode last;

	private static int DEFAULT_SIZE = 10;

	public CacheListener() {
		this(DEFAULT_SIZE);
	}

	public CacheListener(int poolSize) {
		cacheSize = poolSize;
		currentSize = 0;
		first = null; //
		last = null; //
		nodes = new HashMap(poolSize);
	}

	/***************************************************************************
	 * 读取一个对象
	 **************************************************************************/
	public synchronized Object get(Object key) {
		Object x = null;
		try{
			CacheNode node = (CacheNode) nodes.get(key);
			if (node != null) {
				moveToHead(node);
				x = node.value;
			}
		}catch(Exception e){
			log.info("CacheListener===Object get===="+e.toString());
		}
		return x;
	}

	/**
	 * 把指定对象移动到链表的头部
	 */
	private void moveToHead(CacheNode node) {
		try{
			if (node == first) {
				return;
			}
			//log.info("key=1==="+node.key);
			if (node.prev != null) {
				node.prev.next = node.next;
			}
			//log.info("key=2==="+node.key);
			if (node.next != null) {
				node.next.prev = node.prev;
			}
			//log.info("key=3==="+node.key);
			if (last == node) {
				last = node.prev;
			}
			//log.info("key=4==="+node.key);
			if (first != null) {
				node.next = first;
				first.prev = node;
			}
			//log.info("key=5==="+node.key);
			first = node;
			node.prev = null;
			if (last == null) {
				last = first;
			}
		}catch(Exception e){
			log.info("CacheListener===moveToHead===="+e.toString());
		}
	}

	/***************************************************************************
	 * 删除池中指定对象
	 **************************************************************************/
	public synchronized Object remove(Object key) {
		CacheNode node = null;
		try{
			node = (CacheNode) nodes.get(key);
			if (node != null) {
				if (node.prev != null) {
					node.prev.next = node.next;
				}
				if (node.next != null) {
					node.next.prev = node.prev;
				}
				if (last == node) {
					last = node.prev;
				}
				if (first == node) {
					first = node.next;
				}			
				nodes.remove(key);
				node.value.onAbandon();
			}
		}catch(Exception e){
			log.info("CacheListener===remove===="+e.toString());
		}
		return node;
	}

	/***************************************************************************
	 * 放置一个对象到池中
	 */
	public synchronized boolean put(Object key, CacheListenerFun value) {
		boolean bln = false;
		try{
			CacheNode node = (CacheNode) nodes.get(key);
			if (node == null) {
				if (currentSize >= cacheSize) {// 池满，删除最久没有使用的对象
					if (last != null) {
						nodes.remove(last.key);
					}
					removeLast();
				} else {// 池没有满，直接把对象放入池中
					currentSize++;
				}
				node = getANewCacheNode();
			}
			node.value = value;
			node.key = key;
			// 把放入池的这个对象移动到链表的头部，表示最近最短被使用过
			moveToHead(node);
			nodes.put(key, node);
			bln = true;
		}catch(Exception e){
			log.info("CacheListener===put===="+e.toString());
		}
		return bln;
	}

	/***************************************************************************
	 * 清空池中对象
	 **************************************************************************/
	public synchronized void clear() {
		try{
			if (first != null) {
				Iterator i = nodes.values().iterator();
				// 触发事件，该池已经被清空
				CacheNode n;
				while (i.hasNext()) {
					n = (CacheNode) (i.next());
					n.value.poolClear();
				}
			}
			nodes.clear();
			first = null;
			last = null;
		}catch(Exception e){
			log.info("CacheListener===clear===="+e.toString());
		}
	}

	/***************************************************************************
	 * 获得一个新的包裹对象
	 **************************************************************************/
	private CacheNode getANewCacheNode() {
		return new CacheNode();
	}

	/***************************************************************************
	 * 删除池中最久没有使用的对象
	 **************************************************************************/
	private void removeLast() {
		try{
			if (last != null) {
				// 对象从池中被抛弃，触发事件
				last.value.onAbandon();
				if (last.prev != null) {
					last.prev.next = null;
				} else {
					first = null;
				}
				last = last.prev;
			}
		}catch(Exception e){
			log.info("CacheListener===removeLast===="+e.toString());
		}
	}
}