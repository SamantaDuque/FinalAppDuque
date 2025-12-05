// src/services/database.js

import * as SQLite from 'expo-sqlite';

let db;

export const initDB = async () => {
  db = await SQLite.openDatabaseAsync('tejeydesteje.db');

  // TABLA CARRITO
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId TEXT NOT NULL,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      qty INTEGER NOT NULL,
      image TEXT
    );
  `);

  // TABLA PRODUCTOS
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS productos (
      id TEXT PRIMARY KEY NOT NULL,
      nombre TEXT,
      precio REAL,
      imagen TEXT,
      categoria TEXT
    );
  `);

  // TABLA CATEGORIAS
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS categorias (
      id TEXT PRIMARY KEY NOT NULL,
      nombre TEXT
    );
  `);

  console.log("DB initialized");
};

/* CARRITO */
export const saveCartItems = async (items) => {
  await db.execAsync("DELETE FROM cart;");

  for (const it of items) {
    await db.runAsync(
      "INSERT INTO cart (productId, title, price, qty, image) VALUES (?, ?, ?, ?, ?)",
      [it.productId, it.title, it.price, it.qty, it.image || null]
    );
  }
};

export const loadCartItems = async () => {
  return await db.getAllAsync("SELECT * FROM cart");
};

/* PRODUCTOS */
export const saveProductosToDB = async (items) => {
  await db.execAsync("DELETE FROM productos;");

  for (const p of items) {
    await db.runAsync(
      "INSERT INTO productos (id, nombre, precio, imagen, categoria) VALUES (?, ?, ?, ?, ?)",
      [p.id, p.nombre, p.precio, p.imagen, p.categoria || null]
    );
  }
};

export const loadProductosFromDB = async () => {
  return await db.getAllAsync("SELECT * FROM productos");
};

/* CATEGORIAS */
export const saveCategoriasToDB = async (items) => {
  await db.execAsync("DELETE FROM categorias;");

  for (const c of items) {
    await db.runAsync(
      "INSERT INTO categorias (id, nombre) VALUES (?, ?)",
      [c.id, c.nombre]
    );
  }
};

export const loadCategoriasFromDB = async () => {
  return await db.getAllAsync("SELECT * FROM categorias");
};
