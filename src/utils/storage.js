/*
 *  setItem(key,val) 设置localStorage
 *  getItem(key) 获取指定key
 *  getStorage()  获取所有
 *  clearItem(key)  清除指定key
 *  clearAll()  清除所有
 */
const namespace = "mall";
// 将所有内容都存在mall里面   后面增删查也只是在mall里面进行操作
export default {
  setItem(key, val) {
    const storage = this.getStorage();
    storage[key] = val;
    window.localStorage.setItem(namespace, JSON.stringify(storage));
  },
  getItem(key) {
    return this.getStorage()[key];
  },
  getStorage() {
    return JSON.parse(window.localStorage.getItem(namespace) || "{}");
  },
  clearItem(key) {
    const storage = this.getStorage();
    delete storage[key];
    window.localStorage.setItem(namespace, JSON.stringify(storage));
  },
  clearAll() {
    window.localStorage.setItem(namespace, "{}");
  }
};
