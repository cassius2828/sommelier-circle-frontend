import { openDB } from "idb";

const DB_NAME = "smc-cached-data";
const STORE_NAME = "smc-cached_store";

export async function openIndexedDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function setItemIndexedDB(key, value, type) {
  try {
    const db = await openIndexedDB();
    const typeKey = `${key}-${type}`;

    const count = await db.count(STORE_NAME);
    if (count >= 1000) {
      await deleteOldestItem(db);
    }

    await db.put(STORE_NAME, value, typeKey);
  } catch (err) {
    console.error("Error setting item in indexedDB:", err);
  }
}

export async function getItemIndexedDB(key, type) {
  try {
    const db = await openIndexedDB();
    const typeKey = `${key}-${type}`;

    return await db.get(STORE_NAME, typeKey);
  } catch (err) {
    console.error("Error getting item from indexedDB: ", err);
  }
}

export async function deleteItemIndexedDB(key, type) {
  try {
    const db = await openIndexedDB();
    const typeKey = `${key}-${type}`;

    return await db.delete(STORE_NAME, typeKey);
  } catch (err) {
    console.error("Error deleting item from indexedDB", err);
  }
}

export async function clearStore() {
  try {
    const db = await openIndexedDB();
    return await db.clear(STORE_NAME);
  } catch (err) {
    console.error("Error clearing indexed db store: ", err);
  }
}

async function deleteOldestItem(db) {
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = db.transaction(STORE_NAME);
  const cursor = await store.openCursor();
  if (cursor) {
    await cursor.delete();
  }
  await transaction.done;
}
