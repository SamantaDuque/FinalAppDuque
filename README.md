# Teje y Desteje - Proyecto Final CoderHouse

## Descripción del proyecto

**Teje y Desteje** es una aplicación móvil tipo **ecommerce** desarrollada como proyecto final del curso **Desarrollo de Aplicaciones** de **CoderHouse**.  
La app permite a los usuarios explorar, seleccionar y comprar productos artesanales relacionados con tejido, gestionando su carrito de compras y sincronizando los datos tanto online como offline.

La aplicación está desarrollada en **React Native** con **Expo**, utiliza **Redux Toolkit** para el manejo de estado y **Firebase** para autenticación y almacenamiento de datos. Además, implementa **persistencia local con SQLite** para permitir el uso offline y la sincronización de datos al conectarse a internet.

---

## Características

- **Registro e inicio de sesión:** autenticación mediante Firebase Authentication.
- **Gestión de usuario:** mensaje de bienvenida personalizado según el nombre del usuario.
- **Catálogo de productos:** listado de productos con nombre, imagen y precio.
- **Carrito de compras:** agregar productos y mantener persistencia local con SQLite.
- **Categorías de productos:** visualización por categorías.
- **Persistencia offline:** datos almacenados en SQLite para uso sin conexión.
- **Conexión con Firebase:** sincronización de productos, categorías y usuarios.
- **Interfaz intuitiva:** diseño amigable y responsivo.
- **Compatibilidad con ubicación del dispositivo:** la app solicita permiso de ubicación.

---

## Tecnologías utilizadas

- **Frontend:** React Native + Expo
- **Manejo de estado:** Redux Toolkit
- **Backend / BBDD:** Firebase (Authentication y Firestore)
- **Persistencia local:** SQLite
- **Otros:** AsyncStorage, Hooks de React, componentes reutilizables

---

## Estructura del proyecto

src/
│
├── app/ # Configuración de Redux store
├── components/ # Componentes UI y comunes
│ ├── common/
│ │ └── ProductCard.jsx
│ └── ui/
│ └── Button.jsx, Header.jsx, LogoutButton.jsx
├── screens/ # Pantallas de la aplicación
│ ├── Auth/
│ │ ├── LoginScreen.jsx
│ │ └── RegisterScreen.jsx
│ ├── HomeScreen.jsx
│ └── ProductDetailScreen.jsx
├── services/ # Conexión con Firebase y SQLite
│ ├── firebase.js
│ └── database.js
├── store/ # Redux slices
│ ├── authSlice.jsx
│ └── productsSlice.js
└── utils/ # Funciones auxiliares (ej: formateo de precio)


---

## Requisitos

- Node.js >= 18
- Expo CLI
- Cuenta de Firebase con Firestore y Authentication habilitados

---

## Instalación y ejecución

1. **Clonar el repositorio:**

git clone https://github.com/SamantaDuque/FinalAppDuque.git

2. **Entrar en la carpeta del proyecto:**

cd FinalAppDuque/tejeydestejemobile

3. **Instalar dependencias:**

npm install

4. **Iniciar la aplicación con Expo:**

npx expo start

- Esto abrirá Expo Dev Tools en tu navegador.

- Escanea el código QR con la app de Expo Go en tu dispositivo móvil o usa un emulador.

## Configuración de Firebase

1. Crear un proyecto en Firebase.

2. Habilitar Authentication (Email/Password) y Firestore Database.

3. Reemplazar la configuración de Firebase en src/services/firebase.js con la de tu proyecto:

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};


## Notas importantes

- La app implementa sincronización offline usando SQLite, por lo que los productos y el carrito se mantienen aunque no haya conexión.

- Las imágenes de los productos se cargan localmente si están disponibles, o desde URLs proporcionadas en Firebase.

- Los nombres de usuario y productos dependen de los campos name (en usuarios) y nombre (en productos) en Firestore.

## Autor

**Samanta Duque** – Proyecto final de **CoderHouse - Desarrollo de Aplicaciones**

Repositorio: https://github.com/SamantaDuque/FinalAppDuque
