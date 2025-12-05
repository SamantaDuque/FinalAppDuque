// src/store/authSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: null,
  loading: true, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    setUsuario: (state, action) => {
      state.usuario = action.payload;
      state.loading = false;
    },

    
    clearUsuario: (state) => {
      state.usuario = null;
      state.loading = false;
    },

   
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setUsuario, clearUsuario, finishLoading } = authSlice.actions;
export default authSlice.reducer;
