const DB_NAME = "imgdb";
const STORAGE_NAME = "imgs";
const DB_VERSION = 1;
let DB;

export default {
  async getDb() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (e) => {
        console.log("Error opening db", e);
        reject("Error");
      };

      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = (e) => {
        let db = e.target.result;
        db.createObjectStore(STORAGE_NAME, {
          autoIncrement: true,
          keyPath: "id",
        });
      };
    });
  },

  async getImgs() {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction([STORAGE_NAME], "readonly");
      trans.oncomplete = () => {
        resolve(imgs);
      };

      const store = trans.objectStore(STORAGE_NAME);
      const imgs = [];

      store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          imgs.push(cursor.value);          
          cursor.continue();
        }
      };
    });
  },

  async getKeys() {
    let db = await this.getDb();

    return new Promise((resolve) => {
      let trans = db.transaction([STORAGE_NAME], "readonly");
      trans.oncomplete = () => {
        resolve(keys);
      };

      const store = trans.objectStore(STORAGE_NAME);
      const keys = [];

      store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {          
          keys.push(cursor.key)          
          cursor.continue();
        }        
      };
    });
  },


  async saveImgs(imgs) {
    let db = await this.getDb();    
    const keys = await this.getKeys()
    
    return new Promise((resolve) => {
      let trans = db.transaction([STORAGE_NAME], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(STORAGE_NAME);

      for (let key of keys) {
        store.delete(key)
      }
         
      store.put(imgs);
      
    });
  },
};
