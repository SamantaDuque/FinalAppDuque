// src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { saveCartItems, loadCartItems } from '../services/database';

const slice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addItem(state, action) {
      const p = action.payload;
      const ex = state.items.find(i => i.productId === p.productId);

      if (ex) ex.qty += p.qty;
      else state.items.push(p);

      state.total = state.items.reduce((s, it) => s + it.price * it.qty, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.productId !== action.payload);
      state.total = state.items.reduce((s, it) => s + it.price * it.qty, 0);
    },
    clearCartState(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCartState, setCart } = slice.actions;
export default slice.reducer;


export const loadCartFromDB = () => async dispatch => {
  try {
    const rows = await loadCartItems();

    const items = rows.map(r => ({
      productId: r.productId,
      title: r.title,
      price: r.price,
      qty: r.qty,
      image: r.image,
    }));

    const total = items.reduce((s, it) => s + it.price * it.qty, 0);

    dispatch(setCart({ items, total }));
  } catch (e) {
    console.warn('loadCartFromDB', e);
  }
};


export const addToCart = (item) => async (dispatch, getState) => {
  dispatch(addItem(item));
  try {
    await saveCartItems(getState().cart.items);
  } catch (e) { console.warn('saveCart', e); }
};


export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch(removeItem(productId));
  try {
    await saveCartItems(getState().cart.items);
  } catch (e) { console.warn('saveCart', e); }
};


export const clearCart = () => async dispatch => {
  dispatch(clearCartState());
  try {
    await saveCartItems([]);
  } catch (e) { console.warn('saveCart', e); }
};
