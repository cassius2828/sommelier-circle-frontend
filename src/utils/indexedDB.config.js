import { openDB } from "idb";
import diacritics from "diacritics";
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
   console.log(key, ' <-- key set item')
   if (key === "wines") {
    const invertedIdx =  await buildInvertedIndex(value)
   await db.put(STORE_NAME, invertedIdx, 'wines-invertedIndex');

   }
  } catch (err) {
    console.error("Error setting item in indexedDB:", err);
  }
}

async function buildInvertedIndex(wines) {
  const invertedIndex = {};
  wines.forEach((wine, idx) => {
    // normalize our str with diacritics package
    const normalizedStr = diacritics.remove(wine.name).toLowerCase();
    // split words into mult values in array
    const words = normalizedStr.split(/\s+/);
    // for each word in array, add it to invertedIdx or push its idx (from original wines) in the invertedIdx
    words.forEach((word) => {
      if (!invertedIndex[word]) {
        invertedIndex[word] = [];
      }
      invertedIndex[word].push(idx);
    });
  });
  return invertedIndex
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

export async function addSingleItem(key, value, type) {
  const currentData = await getItemIndexedDB(key, type);
  return { ...currentData, value };
}
