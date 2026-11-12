import * as SQLite from 'expo-sqlite';

let dbPromise = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('cookbook_v2.db').then(async (db) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS favorites (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT,
          emoji TEXT,
          category TEXT,
          area TEXT
        );
      `);
      return db;
    });
  }
  return dbPromise;
}

export async function getFavorites() {
  const db = await getDb();
  return db.getAllAsync('SELECT * FROM favorites ORDER BY rowid DESC');
}

export async function addFavorite(r) {
  const db = await getDb();
  await db.runAsync(
    'INSERT OR REPLACE INTO favorites (id, name, emoji, category, area) VALUES (?, ?, ?, ?, ?)',
    [r.id, r.name, r.emoji ?? '', r.category ?? '', r.area ?? '']
  );
}

export async function removeFavorite(id) {
  const db = await getDb();
  await db.runAsync('DELETE FROM favorites WHERE id = ?', [id]);
}

export async function clearFavorites() {
  const db = await getDb();
  await db.runAsync('DELETE FROM favorites');
}