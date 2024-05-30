Rutas de autenticación

POST --> http://localhost/auth/register --> Ruta de Registro
POST --> http://localhost/auth/login --> Ruta de Inicio de Sesion
POST --> http://localhost/auth/logout --> Ruta de Cierre de Sesion
GET ---> http://localhost/auth/profile ---> Ruta de visualizar perfil


Rutas de Usuarios

GET -----> http://localhost/user/ --> Trae todos los Usuarios
GET -----> http://localhost/user/:id --> Trae un usuario especifico (Detalle)
PUT -----> http://localhost/user/:id --> Modificar un usuario existente
DELETE --> http://localhost/user/:id --> Eliminar un usuario existente


Rutas de Producto

GET ----> http://localhost/product/ ----> Trae todos los productos
GET ----> http://localhost/product/vinyl ----> Trae todos los productos de la categoria Vinyl
GET ----> http://localhost/product/laminate ----> Trae todos los productos de la categoria Laminate
GET ----> http://localhost/product/find/:id ----> Trae un producto especifico (Detalle)
POST ---> http://localhost/product/new ---> Crea un nuevo producto
PUT ----> http://localhost/product/find/:id ----> Modifica un producto existente
Delete --> http://localhost/product/find/:id --> Elimina un producto existente


Rutas del Carrito

GET ----> http://localhost/cart/ ----> Trae el carrito del usuario
GET ----> http://localhost/cart/new ----> Vacia el carrito una vez se manda la orden
POST ----> http://localhost/cart/add ----> Añade un producto al carrito
DELETE ----> http://localhost/cart/sub ---> Elimina un producto del carrito


Rutas de las Ordenes

GET ----> http://localhost/order/ --> Trae Todas las Órdenes
GET ----> http://localhost/order/pending --> Trae Todas las Órdenes Pendientes
GET ----> http://localhost/order/in-process --> Trae Todas las Órdenes en Proceso
GET ----> http://localhost/order/completed --> Trae Todas las Órdenes Completadas
GET ----> http://localhost/order/user/:id --> Trae las Órdenes de un Usuario Específico
POST ----> http://localhost/order/new/:cartId --> Crea una Nueva Orden
PATCH ----> http://localhost/order/status/c/:id --> Cambia el Estado de una Orden a Completada
PATCH ----> http://localhost/order/status/p/:id --> Cambia el Estado de una Orden a En Proceso
DELETE ----> http://localhost/order/delete/:id --> Elimina una Orden Existente