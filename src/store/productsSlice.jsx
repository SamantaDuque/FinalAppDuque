// src/store/productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

// SQLite
import { 
  loadProductosFromDB, 
  saveProductosToDB,
  loadCategoriasFromDB,
  saveCategoriasToDB
} from '../services/database';


export const fetchProductos = createAsyncThunk(
  'productos/fetchProductos',
  async () => {
    
    const localData = await loadProductosFromDB();
    if (localData.length > 0) return localData;

    
    const snap = await getDocs(collection(db, 'productos'));
    const productos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    
    await saveProductosToDB(productos);

    return productos;
  }
);


export const fetchCategorias = createAsyncThunk(
  'productos/fetchCategorias',
  async () => {
    
    const localData = await loadCategoriasFromDB();
    if (localData.length > 0) return localData;

    
    const snap = await getDocs(collection(db, 'categorias'));
    const categorias = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    
    await saveCategoriasToDB(categorias);

    return categorias;
  }
);

const productosSlice = createSlice({
  name: 'productos',
  initialState: {
    items: [],
    categorias: [],
    loading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      
      .addCase(fetchProductos.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })

      
      .addCase(fetchCategorias.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.categorias = action.payload;
        state.loading = false;
      });
  }
});

export default productosSlice.reducer;
