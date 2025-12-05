import { onValue, ref } from "firebase/database";
import { database } from "./firebase";

import { saveProductsToDB, loadProductsFromDB } from "./database";
import { setProducts } from "../features/products/productsSlice";

export const startSync = (store) => {
  const productosRef = ref(database, "productos");

  onValue(productosRef, async (snapshot) => {
    const data = snapshot.val();

    if (!data) return;

   
    const lista = Object.keys(data).map((id) => ({
      id,
      ...data[id],
    }));

  
    await saveProductsToDB(lista);

    
    store.dispatch(setProducts(lista));
  });

  
  loadProductsFromDB().then((productosLocales) => {
    if (productosLocales && productosLocales.length > 0) {
      store.dispatch(setProducts(productosLocales));
    }
  });
};
