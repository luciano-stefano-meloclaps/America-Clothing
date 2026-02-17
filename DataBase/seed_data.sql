-- Asegurar encoding UTF-8
SET NAMES utf8mb4;
USE VintageDB;
SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar tablas
TRUNCATE TABLE product;
TRUNCATE TABLE saleorderline;
TRUNCATE TABLE saleorder;
TRUNCATE TABLE user;

-- Asegurar que las tablas usan utf8mb4
ALTER TABLE product CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE user CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ============================================
-- USUARIOS DE PRUEBA - Mock Data Profesional
-- ============================================
-- Estructura: name, last_name, username, email, password, usertype, state, address, phone_number
-- usertype: 'admin', 'employee', 'client'
-- state: 1 (habilitado), 0 (deshabilitado)

INSERT INTO user (name, last_name, username, email, password, usertype, state, address, phone_number) VALUES
-- ADMINISTRADORES (3)
('Luciano', 'Stefano', 'luciano.admin', 'luciano.stefano@vintage.com', 'admin123', 'admin', 1, 'Zeballos 1341, Rosario, Santa Fe', '+54 341 555-1001'),
('María', 'González', 'maria.admin', 'maria.gonzalez@vintage.com', 'admin123', 'admin', 1, 'Av. Pellegrini 1250, Rosario, Santa Fe', '+54 341 555-1002'),
('Carlos', 'Rodríguez', 'carlos.admin', 'carlos.rodriguez@vintage.com', 'admin123', 'admin', 0, 'Bv. Oroño 850, Rosario, Santa Fe', '+54 341 555-1003'),

-- EMPLEADOS (5)
('Ana', 'Martínez', 'ana.employee', 'ana.martinez@vintage.com', 'emp123', 'employee', 1, 'Córdoba 1520, Rosario, Santa Fe', '+54 341 555-2001'),
('Diego', 'Fernández', 'diego.employee', 'diego.fernandez@vintage.com', 'emp123', 'employee', 1, 'San Martín 980, Rosario, Santa Fe', '+54 341 555-2002'),
('Laura', 'López', 'laura.employee', 'laura.lopez@vintage.com', 'emp123', 'employee', 1, 'Sarmiento 1100, Rosario, Santa Fe', '+54 341 555-2003'),
('Javier', 'Sánchez', 'javier.employee', 'javier.sanchez@vintage.com', 'emp123', 'employee', 0, 'Rioja 1450, Rosario, Santa Fe', '+54 341 555-2004'),
('Sofía', 'Ramírez', 'sofia.employee', 'sofia.ramirez@vintage.com', 'emp123', 'employee', 1, 'Entre Ríos 920, Rosario, Santa Fe', '+54 341 555-2005'),

-- CLIENTES (12)
('Martín', 'Pérez', 'martin.client', 'martin.perez@gmail.com', 'client123', 'client', 1, 'Mendoza 1340, Rosario, Santa Fe', '+54 341 555-3001'),
('Valentina', 'García', 'valentina.client', 'valentina.garcia@hotmail.com', 'client123', 'client', 1, 'Santa Fe 2100, Rosario, Santa Fe', '+54 341 555-3002'),
('Tomás', 'Díaz', 'tomas.client', 'tomas.diaz@outlook.com', 'client123', 'client', 1, 'Urquiza 1780, Rosario, Santa Fe', '+54 341 555-3003'),
('Camila', 'Torres', 'camila.client', 'camila.torres@yahoo.com', 'client123', 'client', 0, 'Mitre 1650, Rosario, Santa Fe', '+54 341 555-3004'),
('Santiago', 'Morales', 'santiago.client', 'santiago.morales@gmail.com', 'client123', 'client', 1, 'Belgrano 890, Rosario, Santa Fe', '+54 341 555-3005'),
('Florencia', 'Castro', 'florencia.client', 'florencia.castro@gmail.com', 'client123', 'client', 1, 'Tucumán 1420, Rosario, Santa Fe', '+54 341 555-3006'),
('Nicolás', 'Romero', 'nicolas.client', 'nicolas.romero@hotmail.com', 'client123', 'client', 1, 'Paraguay 1150, Rosario, Santa Fe', '+54 341 555-3007'),
('Julieta', 'Vargas', 'julieta.client', 'julieta.vargas@outlook.com', 'client123', 'client', 0, 'Corrientes 1890, Rosario, Santa Fe', '+54 341 555-3008'),
('Facundo', 'Herrera', 'facundo.client', 'facundo.herrera@gmail.com', 'client123', 'client', 1, 'Laprida 1320, Rosario, Santa Fe', '+54 341 555-3009'),
('Agustina', 'Molina', 'agustina.client', 'agustina.molina@yahoo.com', 'client123', 'client', 1, 'Balcarce 1560, Rosario, Santa Fe', '+54 341 555-3010'),
('Mateo', 'Benítez', 'mateo.client', 'mateo.benitez@gmail.com', 'client123', 'client', 1, 'Catamarca 1240, Rosario, Santa Fe', '+54 341 555-3011'),
('Catalina', 'Silva', 'catalina.client', 'catalina.silva@hotmail.com', 'client123', 'client', 1, 'Jujuy 1670, Rosario, Santa Fe', '+54 341 555-3012');

-- ============================================
-- PRODUCTOS EXCLUSIVOS
-- ============================================
INSERT INTO product (code, name, description, category, price, size, stock, sold, state, image) VALUES
(101, 'Campera rompevientos Nautica Spell Out 90''s', 'Hermosa campera rompevientos Nautica Spell Out época 90s, cuenta con su descripción de marca bordado, logo bordado en su pecho, capucha escondida, elástico en puños y cintura, dos bolsillos externos delanteros con cierre, deslizador de cierre metalitico grabado su logo, cubre cierre con botones, una verdadera belleza vintage, made in Vietnam. ', 'Camperas', 125000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003947475-e0c8eb9a83f1a2e35917688662111869-1024-1024.webp'),
(102, 'Hoodie Nike Force KMA Baskteball 00s', 'Descubrí el Hoodie Nike Force KMA Basketball 00s, una prenda única que combina estilo retro con la calidad y confort característicos de Nike. Este hoodie está confeccionado con materiales resistentes y cálidos, ideales para acompañarte en tus entrenamientos o para un look casual y deportivo.', 'Buzos', 140000, 'M', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004021579-267741caffd62de6d917695450905292-1024-1024.webp'),
(103, 'Buzos rompevientos Nike Air Big Swoosh 90s', 'Hermoso buzo rompevientos estilo bomber Nike Air Big Swoosh época 90s, cuenta con elástico en puños y cintura, big swoosh bordado en su pecho, air bordado en su cuello, una verdadera belleza vintage, made in Thailand. ', 'Buzos', 210000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003920226-531a319dadd486460e17682478668317-1024-1024.webp'),

(201, 'Camisa Náutica', 'Elegante camisa náutica estampada, perfecta para aquellos que buscan un toque distintivo en su vestuario. Esta prenda destaca por su diseño sofisticado y su estampado único que captura la esencia del estilo náutico.', 'Camisas', 105000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000177192-0d353943eef2eae64617016492711986-1024-1024.webp'),
(202, 'Camisa Tommy Hilfiger', 'Camisa Tommy Hilfiger original de los 90s. Algodón gastado a la perfección. Una reliquia del grunge que solo aumentará su valor con el tiempo. Estampa craquelada auténtica.', 'Camisas', 95000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000522616-6fa7473e28693ee40617145192743134-1024-1024.webp'),
(203, 'Camisa Hawaiana 90s', 'Hermosa camisa hawaiana, marca david Taylor se encuentra con etiqueta, cuenta con bolsillo en su pecho, made in indonesia, se encuentra nueva.', 'Camisas', 85000, 'M', 3, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000187375-6ce3ee4676e868858617024258823403-1024-1024.webp'),

(301, 'Buzo San Francisco 49ers NFL', 'Hermoso buzo Team Apparel de San Francisco 49ers NFL, cuenta con su logo bordado y descripción de equipacion bordado felpeado, elástico en puños y cintura, made in Asia. ', 'Buzos', 95000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003925419-fef770e372321369e417683531648152-1024-1024.webp'),
(302, 'Carpenter Pants Carhartt', 'Auténticos pantalones de trabajo Carhartt de los 90s. Doble rodilla, lona resistente color Camel. La estética workwear en su máxima expresión. Manchas de pintura originales que le dan carácter.', 'Pantalones', 60000, '34', 2, 0, 1, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'),

(401, 'Bomber Jordan', 'Hermosa bomber Jordan, cuenta con su logo bordado en su pecho, made in Vietnam. ', 'Camperas', 290000, 'XL', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765991-8ad6856a3404c72e1b17652407693858-1024-1024.webp'),
(402, 'Campera rompevientos Nike NSW 00''s', 'Hermosa campera rompevientos estilo bomber Nike NSW época 90s, cuenta con elástico en puños y cintura, big swoosh bordado en su pecho, air bordado en su cuello, una verdadera belleza vintage, made in Thailand. ', 'Camperas', 210000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765670-902feb95b23792add017652377303847-1024-1024.webp'),
(403, 'Campera Nike Fútbol Equipo Arsenal inglés año 80/90', 'Una verdadera pieza de colección para los fanáticos del fútbol y del estilo retro. Este rompevientos Nike del mítico Arsenal de Inglaterra, de fines de los 80''s y 90''s, combina historia, identidad deportiva y un diseño que marcó época. Liviana, cómoda y llena de nostalgia futbolera, es la prenda ideal para quienes buscan destacar con autenticidad y llevar el legado de un club histórico en su outfit, se encuentra en muy buenas condiciones generales a pesar de los años.', 'Camperas', 270000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003416511-9df12af04c2ae3689617590920254063-1024-1024.webp'),
(404, 'Campera reversible New York Jets NFL Big Logo 90s', 'Hermosa campera reversible New York Jets NFL Big Logo años 90s, cuenta con elástico en puños y cintura, en una cara logo bordado en su pecho, en otra cara Big Logo bordado en su espalda, descripción de equipacion bordado en su pecho, logo de marca bordado en una manga, bolsillo externos delanteros en ambas caras, bolsillo extra en su pecho, con logo bordado, made in Korea y se encuentra en impecables condiciones generales a pesar de los años. ', 'Camperas', 310000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002994218-91304828e5ea9b3e0917524512350548-1024-1024.webp'),

(501, 'Buzo Nike Sportswear Swoosh', 'Estilo clásico, comodidad total y el sello Nike en su punto justo.Con el icónico Swoosh al frente, este buzo combina un diseño limpio con materiales de alta calidad que garantizan confort y durabilidad. Ideal para el día a día o para elevar cualquier look streetwear. Una pieza moderna con la esencia deportiva que nunca pasa de moda.', 'Buzos', 175000, '42', 1, 0, 1,  'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003518543-a5ee01808ea4dd92b017608996032008-1024-1024.webp'),
(502, 'Campera Starter Universidad California Big Logo 90s', 'Todo el estilo universitario y streetwear de los 90''s en una sola prenda. Esta campera Starter de la Universidad de California con Big Logo combina comodidad, actitud deportiva y ese diseño retro que hoy vuelve a estar en tendencia. Ideal para quienes buscan un look auténtico y lleno de historia, made in Indonesia y se encuentra en impecables condiciones generales a pesar de los años, una prenda de colección.', 'Camperas', 230000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003417198-56d89892e497ed94b217590974469099-1024-1024.webp'),
(503, 'Campera rompevientos Nike Big Swoosh Tricolor', 'Hermosa campera rompevientos Nike Big Swoosh Tricolor, cuenta con elástico en puños y cintura, dos bolsillos externos delanteros con cierre, red en su interior, logo bordado en su pecho, made in Vietnam y se encuentra en impecables condiciones generales.', 'Camperas', 210000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765904-fd685cd3f355d24c8017652403415075-1024-1024.webp'),

(601, 'Buzo rompevientos Nike Team Michigan 90s', 'Hermoso buzo rompevientos Nike Team Universidad Michigan Big Logo, cuenta con elástico en puños y cintura, big logo bordado en su pecho, logo de marca bordado en su pecho, made in Indonesia y es una verdadera belleza vintage para los que saben de historia.', 'Buzos', 190000, 'Única', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003943319-c6c0f84c06aac9174117687722709385-1024-1024.webp'),
(602, 'Remera Polo Ralph Lauren Big Logo Nueva', 'Remera Polo Ralph Lauren Big Logo Nueva, cuenta con su logo bordado en su pecho, made in Indonesia y es una verdadera belleza vintage para los que saben de historia.', 'Remeras', 90000, 'Única', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004049295-fe362e34b5b35eae1f17700574529308-1024-1024.webp'),

(701, 'Remera Polo Bear Nueva con etiqueta', 'Hermosa remera Polo Bear, nueva con etiqueta, cuenta con su estampado en el pecho, made in Vietnam. Remera Polo Bear Nueva con etiqueta, cuenta con su logo bordado en su pecho, made in Indonesia y es una verdadera belleza vintage para los que saben de historia.', 'Remeras', 90000, 'Única', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004049279-d981f8c4ca54ab444817700572402715-1024-1024.webp'),
(702, 'Jersey Celtic Boston NBA x Nike Walker', 'Hermoso jersey Celtic Boston NBA x Nike Walker, cuenta con su logo bordado en su pecho, made in Vietnam. Remera Polo Bear Nueva con etiqueta, cuenta con su logo bordado en su pecho, made in Indonesia y es una verdadera belleza vintage para los que saben de historia.', 'Remeras', 90000, 'Única', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002993022-7c370104ff8cb3774917524390305726-1024-1024.webp');

-- ============================================
-- ÓRDENES DE VENTA - Mock Data
-- ============================================
-- Estructura: id, date, user_id
INSERT INTO saleorder (id, date, user_id) VALUES
(1, '2026-02-10 14:30:00', 11),  -- Martín Pérez (cliente)
(2, '2026-02-11 10:15:00', 12),  -- Valentina García (cliente)
(3, '2026-02-12 16:45:00', 13),  -- Tomás Díaz (cliente)
(4, '2026-02-13 11:20:00', 15),  -- Santiago Morales (cliente)
(5, '2026-02-14 09:30:00', 16),  -- Florencia Castro (cliente)
(6, '2026-02-15 15:10:00', 17),  -- Nicolás Romero (cliente)
(7, '2026-02-16 13:50:00', 19),  -- Facundo Herrera (cliente)
(8, '2026-02-16 17:25:00', 20);  -- Agustina Molina (cliente)

-- ============================================
-- LÍNEAS DE ÓRDENES - Mock Data
-- ============================================
-- Estructura: id, amount, unit_price, product_code, saleorder_id
INSERT INTO saleorderline (id, amount, unit_price, product_code, saleorder_id) VALUES
-- Orden 1: Martín compra 2 items
(1, 1, 125000, 101, 1),  -- Campera Nautica
(2, 1, 140000, 102, 1),  -- Hoodie Nike

-- Orden 2: Valentina compra 1 item
(3, 1, 210000, 103, 2),  -- Buzo Nike Air

-- Orden 3: Tomás compra 3 items
(4, 1, 105000, 201, 3),  -- Camisa Náutica
(5, 1, 95000, 202, 3),   -- Camisa Tommy Hilfiger
(6, 1, 85000, 203, 3),   -- Camisa Hawaiana

-- Orden 4: Santiago compra 1 item caro
(7, 1, 290000, 401, 4),  -- Bomber Jordan

-- Orden 5: Florencia compra 2 items
(8, 1, 210000, 402, 5),  -- Campera Nike NSW
(9, 1, 175000, 501, 5),  -- Buzo Nike Sportswear

-- Orden 6: Nicolás compra 1 item
(10, 1, 270000, 403, 6), -- Campera Arsenal

-- Orden 7: Facundo compra 2 remeras
(11, 1, 90000, 602, 7),  -- Remera Polo Ralph Lauren
(12, 1, 90000, 701, 7),  -- Remera Polo Bear

-- Orden 8: Agustina compra 1 item premium
(13, 1, 310000, 404, 8); -- Campera Jets NFL

SET FOREIGN_KEY_CHECKS = 1;
