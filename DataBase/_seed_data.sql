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

-- Camperas
INSERT INTO product (code, name, description, category, price, size, stock, sold, state, image) VALUES
(101, 'Campera rompevientos Nautica Spell Out 90s', 'Hermosa campera rompevientos Nautica Spell Out época 90s, cuenta con su descripción de marca bordado, logo bordado en su pecho, capucha escondida, elástico en puños y cintura, dos bolsillos externos delanteros con cierre, deslizador de cierre metalitico grabado su logo, cubre cierre con botones, una verdadera belleza vintage, made in Vietnam. ', 'Camperas', 125000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003947475-e0c8eb9a83f1a2e35917688662111869-1024-1024.webp'),
(401, 'Bomber Jordan', 'Hermosa bomber Jordan, cuenta con su logo bordado en su pecho, made in Vietnam. ', 'Camperas', 290000, 'XL', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765991-8ad6856a3404c72e1b17652407693858-1024-1024.webp'),
(402, 'Campera rompevientos Nike NSW 00s', 'Hermosa campera rompevientos estilo bomber Nike NSW época 90s, cuenta con elástico en puños y cintura, big swoosh bordado en su pecho, air bordado en su cuello, una verdadera belleza vintage, made in Thailand. ', 'Camperas', 210000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765670-902feb95b23792add017652377303847-1024-1024.webp'),
(403, 'Campera Nike Fútbol Equipo Arsenal inglés año 80/90', 'Una verdadera pieza de colección para los fanáticos del fútbol y del estilo retro. Este rompevientos Nike del mítico Arsenal de Inglaterra, de fines de los 80s and 90s, combina historia, identidad deportiva y un diseño que marcó época. Liviana, cómoda y llena de nostalgia futbolera, es la prenda ideal para quienes buscan destacar con autenticidad y llevar el legado de un club histórico en su outfit, se encuentra en muy buenas condiciones generales a pesar de los años.', 'Camperas', 270000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003416511-9df12af04c2ae3689617590920254063-1024-1024.webp'),
(404, 'Campera reversible New York Jets NFL Big Logo 90s', 'Hermosa campera reversible New York Jets NFL Big Logo años 90s, cuenta con elástico en puños y cintura, en una cara logo bordado en su pecho, en otra cara Big Logo bordado en su espalda, descripción de equipacion bordado en su pecho, logo de marca bordado en una manga, bolsillo externos delanteros en ambas caras, bolsillo extra en su pecho, con logo bordado, made in Korea y se encuentra en impecables condiciones generales a pesar de los años. ', 'Camperas', 310000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002994218-91304828e5ea9b3e0917524512350548-1024-1024.webp'),
(502, 'Campera Starter Universidad California Big Logo 90s', 'Todo el estilo universitario y streetwear de los 90s en una sola prenda. Esta campera Starter de la Universidad de California con Big Logo conmina comodidad, actitud deportiva y ese diseño retro que hoy vuelve a estar en tendencia. Ideal para quienes buscan un look auténtico y lleno de historia, made in Indonesia y se encuentra en impecables condiciones generales a pesar de los años, una prenda de colección.', 'Camperas', 230000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003417198-56d89892e497ed94b217590974469099-1024-1024.webp'),
(503, 'Campera rompevientos Nike Big Swoosh Tricolor', 'Hermosa campera rompevientos Nike Big Swoosh Tricolor, cuenta con elástico en puños y cintura, dos bolsillos externos delanteros con cierre, red en su interior, logo bordado en su pecho, made in Vietnam and se encuentra en impecables condiciones generales.', 'Camperas', 210000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765904-fd685cd3f355d24c8017652403415075-1024-1024.webp'),
(1101, 'Archival Heritage Windbreaker', 'Una pieza de archivo impecable. Este rompevientos tricolor captura la esencia del diseño deportivo de los 90. Confeccionada en nylon de alta densidad con forro de micro-red, ofrece una silueta técnica y nostálgica inigualable.', 'Camperas', 225000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003247588-f03e70f43d74a27aa717560736049110-1024-1024.webp'),
(1102, 'Iconic Swoosh Technical Shell', 'Estética minimalista con el sello de calidad de una marca de culto. Esta campera técnica ligera destaca por su versatilidad urbana y un acabado mate que eleva el look sportswear a una categoría de lujo moderno.', 'Camperas', 245000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003518177-8804a966029bb3ad1017608948719647-1024-1024.webp'),
(1103, 'Retro Varsity Leather-Trim Bomber', 'La definición de lo clásico americano. Confeccionada en un paño de lana premium con detalles de terminación de alta gama, esta bomber varsity evoca el espíritu universitario de las universidades de la Ivy League de los 80.', 'Camperas', 315000, 'XL', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003246847-5079f929f64fc23bc717560688928639-1024-1024.webp'),
(1104, 'Urban Explorer GORE-TEX Jacket', 'Diseñada para resistir con estilo. Esta pieza técnica de principios de los 00 presenta paneles articulados y una estructura robusta ideal para exploradores urbanos que buscan autenticidad técnica y durabilidad extrema.', 'Camperas', 345000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003916666-6a62cc387498ac320017681586535920-1024-1024.webp'),
(1105, 'Vintage Court Side Zip-Up', 'La elegancia del tenis de archivo. Una campera liviana con cierre completo y detalles de ribete en contraste que rinde homenaje a los uniformes de los grandes torneos de los años 70. Una joya deportiva de colección.', 'Camperas', 195000, 'S', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003518077-a90063e378440b0ed317608940309275-1024-1024.webp'),
(1106, 'Midnight Stealth Utility Parka', 'Funcionalidad táctica envuelta en noir absoluto. Esta parka utilitaria de lona técnica ofrece múltiples bolsillos de perfil bajo y una caída estructurada perfecta para un look vanguardista y reservado.', 'Camperas', 285000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003924312-36c1e34e8b75f9785117683355538199-1024-1024.webp'),
(1107, 'Sport Heritage Logo Anorak', 'El anorak definitivo de los 90. Confeccionado con un ripstop liviano y una paleta de colores vibrantes de época, esta pieza pop-over es un testimonio de la cultura streetwear más auténtica de la década.', 'Camperas', 215000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765758-4681c7fa0d2babf72c17652390291287-1024-1024.webp'),
(1108, 'City Rhythm Minimalist Windbreaker', 'Líneas puras y confort total. Un rompevientos diseñado para la ciudad, con un tejido semi-satinado que aporta un brillo sutil y una sofisticación sin esfuerzo a cualquier outfit diario.', 'Camperas', 185000, 'M', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004049352-16453185817b9b7e6417700586308562-1024-1024.webp'),
(1109, 'Alpine Archive Fleece-Lined Shell', 'Calidez técnica con estética retro. Esta campera de exterior cuenta con un forro interior de fleece polar de alto gramaje y un exterior resistente al viento, ideal para las transiciones de temporada con un look montañés.', 'Camperas', 265000, 'XL', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003345460-70ef84b9e926f4db0917578764977646-1024-1024.webp'),
(1110, 'Racing Spirit Heritage Jacket', 'Inspirada en la cultura automovilística de los 80. Con parches bordados y un corte sastrero deportivo, esta campera técnica captura la adrenalina de las pistas con la elegancia de la ropa de ocio premium.', 'Camperas', 295000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003312427-7b8f089cffbc18f0b717572774485956-1024-1024.webp'),
(1111, 'Retro Stadium Long Coat', 'La prenda icónica de los banquillos de los 90. Este abrigo largo de estadio ofrece una protección térmica superior con una estética "oversize" que hoy es tendencia absoluta en el high-fashion urbano.', 'Camperas', 325000, 'Única', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004049381-5947b4960a45eb74e017700588624638-1024-1024.webp'),
(1112, 'Satin Era Varsity Bomber', 'Brillo satinado y herencia deportiva. Una bomber varsity que reconstruye el glamour de las equipaciones de béisbol de los 70 con materiales mejorados y una silueta que se ajusta a la perfección.', 'Camperas', 275000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765229-c990eee06e7385261a17652359620030-1024-1024.webp'),
(1113, 'Rugged Canvas Barn Jacket', 'La esencia del workwear de archivo. Esta campera de lona encerada con cuello de pana es una pieza indestructible que solo mejora con el paso de los años, aportando un aire de rusticidad masculina refinada.', 'Camperas', 255000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003854841-78d75cb896e7109b0c17667833321008-1024-1024.webp'),
(1114, 'Nautical Spell Out Parka', 'Inspiración náutica de alto rendimiento. Con el logo de la marca bordado en tipografía de archivo y un sistema de ajuste técnico, esta parka rompe las convenciones con su vibrante energía de cubierta.', 'Camperas', 285000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765732-2c7de40e11b50ad5d317652384244273-1024-1024.webp'),
(1115, 'Archive Team Puffer Jacket', 'Volumen y calidez retro. Esta campera tipo puffer captura la estética acolchada de los uniformes de equipación de los 80, ofreciendo un aislamiento térmico excepcional con un look icónico e imponente.', 'Camperas', 335000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003925460-649faf0b8625cb91f717683539334814-1024-1024.webp'),
(1116, 'Heritage Club Reversible Shell', 'Dos identidades en una sola pieza de archivo. Esta campera reversible permite alternar entre un diseño audaz de logotipos y una cara minimalista monocromática, capturando la versatilidad de los 90.', 'Camperas', 315000, 'XL', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003311369-3015791cb30e2bd70617572698942427-1024-1024.webp'),
(1117, 'Abstract Geometry Windbreaker', 'Arte visual sobre nylon técnico. Este rompevientos de archivo presenta una estampa geométrica abstracta inspirada en las tendencias gráficas de finales de los 80, una verdadera prenda de declaración.', 'Camperas', 235000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002428143-e7851b2faec38643cf17430100772401-1024-1024.webp'),
(1118, 'Archival Tech-Shell Parka', 'Diseño funcional de principios de los 00. Esta parka técnica de nylon reforzado ofrece una silueta estructurada, múltiples puntos de ajuste y una resistencia climática superior, ideal para el urban slow-fashion.', 'Camperas', 275000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003925286-79b8cd6ca56e2929f217683525180094-1024-1024.webp'),
(1119, 'Heritage Padded Field Jacket', 'La robustez de la lona de algodón con un toque de confort moderno. Con forro de fleece polar y detalles sastre, esta chaqueta de campo es una pieza de herencia diseñada para perdurar y envejecer con carácter.', 'Camperas', 295000, 'XL', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003855005-15e64148e6841ad66617667854521552-1024-1024.webp'),
(1120, 'Retro Sport Nylon Anorak', 'Inspirado en los uniformes de entrenamiento de los 90. Este anorak ligero presenta un diseño color-block audaz y un tejido ripstop que garantiza ligereza y un estilo retro-deportivo auténtico.', 'Camperas', 235000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003417088-6ed468f6fef0cd280e17590954429224-1024-1024.webp'),
(1121, 'Classic Varsity Satin Bomber', 'Brillo satinado de archivo con terminaciones en rib-knit de alta calidad. Una bomber que captura el glamour de las bandas de los 80, aportando un toque de lujo audaz a cualquier selección vintage.', 'Camperas', 285000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003416980-1ddcb1fde56677305b17590947779697-1024-1024.webp'),
(1122, 'Urban Ripstop Windbreaker', 'Durabilidad extrema en un formato ligero. El patrón de cuadrícula del ripstop no solo es funcional sino que aporta una textura visual única a este rompevientos diseñado para el pulso de la ciudad.', 'Camperas', 215000, 'S', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002878032-38c569b7c8fc6ae4fe17508904881052-1024-1024.webp'),
(1123, 'Vintage Stadium Fleece Parka', 'Máxima protección térmica con el sello de las grandes ligas de los 90. Esta parka oversized cuenta con detalles bordados de herencia y un aislamiento de alto nivel para enfrentar el invierno con actitud.', 'Camperas', 315000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003854937-dcff2fc7f17138ae0e17667844679138-1024-1024.webp');

-- Buzos
INSERT INTO product (code, name, description, category, price, size, stock, sold, state, image) VALUES
(102, 'Hoodie Nike Force KMA Baskteball 00s', 'Descubrí el Hoodie Nike Force KMA Basketball 00s, una prenda única que combina estilo retro con la calidad y confort característicos de Nike. Este hoodie está confeccionado con materiales resistentes y cálidos, ideales para acompañarte en tus entrenamientos o para un look casual y deportivo.', 'Buzos', 140000, 'M', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004021579-267741caffd62de6d917695450905292-1024-1024.webp'),
(103, 'Buzos rompevientos Nike Air Big Swoosh 90s', 'Hermoso buzo rompevientos estilo bomber Nike Air Big Swoosh época 90s, cuenta con elástico en puños y cintura, big swoosh bordado en su pecho, air bordado en su cuello, una verdadera belleza vintage, made in Thailand. ', 'Buzos', 210000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003920226-531a319dadd486460e17682478668317-1024-1024.webp'),
(301, 'Buzo San Francisco 49ers NFL', 'Hermoso buzo Team Apparel de San Francisco 49ers NFL, cuenta con su logo bordado y descripción de equipacion bordado felpeado, elástico en puños y cintura, made in Asia. ', 'Buzos', 95000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003925419-fef770e372321369e417683531648152-1024-1024.webp'),
(501, 'Buzo Nike Sportswear Swoosh', 'Estilo clásico, comodidad total y el sello Nike en su punto justo.Con el icónico Swoosh al frente, este buzo combina un diseño limpio con materiales de alta calidad que garantizan confort y durabilidad. Ideal para el día a día o para elevar cualquier look streetwear. Una pieza moderna con la esencia deportiva que nunca pasa de moda.', 'Buzos', 175000, '42', 1, 0, 1,  'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003518543-a5ee01808ea4dd92b017608996032008-1024-1024.webp'),
(601, 'Buzo rompevientos Nike Team Michigan 90s', 'Hermoso buzo rompevientos Nike Team Universidad Michigan Big Logo, cuenta con elástico en puños y cintura, big logo bordado en su pecho, logo de marca bordado en su pecho, made in Indonesia y es una verdadera belleza vintage para los que saben de historia.', 'Buzos', 190000, 'Única', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003943319-c6c0f84c06aac9174117687722709385-1024-1024.webp'),
(1001, 'Heritage Fleece Hoodie', 'Descubrí la comodidad absoluta con este hoodie de algodón pesado. Su corte relajado y textura suave lo convierten en un básico premium esencial para cualquier guardarropa de invierno con esencia retro.', 'Buzos', 165000, 'L', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003764998-bc99bbd328996e03bd17652325704762-1024-1024.webp'),
(1002, 'Archival Sport Crewneck', 'Inspirado en el diseño deportivo de finales de los 90. Este crewneck destaca por su durabilidad y un ajuste clásico que evoca la era dorada del sportswear de alto rendimiento.', 'Buzos', 145000, 'M', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003518437-31320e62d7ed0dc08317608985181073-1024-1024.webp'),
(1003, 'Vintage Collegiate Pullover', 'Una pieza con historia. Con detalles bordados minuciosos y un textil de alta densidad, este pullover recrea la estética de las universidades americanas de los años 90 con una pátina de autenticidad.', 'Buzos', 185000, 'XL', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003311384-670701dd848db03b8e17572706629858-1024-1024.webp'),
(1004, 'Midnight Onyx Oversized Hoodie', 'Sofisticación en negro absoluto. Este hoodie oversized está confeccionado con un fleece premium que garantiza calidez y un look vanguardista. Ideal para quienes buscan minimalismo y confort extremo.', 'Buzos', 195000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003311561-5860ae528e930a266217572730614121-1024-1024.webp'),
(1005, 'Retro Block Color Sweatshirt', 'Fiel al estilo vibrante de los 80. Este sweatshirt presenta un diseño de bloques de color que aporta una energía única a cualquier outfit urbano, manteniendo la calidad sourt-touch original.', 'Buzos', 155000, 'S', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002427906-307966ab68a61e7fb017430061279113-1024-1024.webp'),
(1006, 'Old School Track Top', 'Un tributo a la identidad visual de las marcas de culto. Confeccionado en un tejido técnico de algodón, este track top ofrece una silueta estructurada y deportiva con un sello nostálgico inconfundible.', 'Buzos', 175000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002993658-fa6a621e86430d538817524459326657-1024-1024.webp'),
(1007, 'Urban Explorer Quarter-Zip', 'Versatilidad y estilo táctico vintage. Este buzo con cierre al cuello permite ajustar el confort térmico mientras aporta un aire de aventura urbana típico de los diseños de archivo de montaña.', 'Buzos', 225000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003518244-862af4757a472b801517608954930345-1024-1024.webp'),
(1008, 'Pastel Dream Soft Crewneck', 'La suavidad del algodón en tonos pastel de época. Un crewneck que respira la estética dócil de los 90, perfecto para capas ligeras y un estilo personal delicado pero auténtico.', 'Buzos', 155000, 'M', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002875930-9a411e848dd59beb6417508607844546-1024-1024.webp'),
(1009, 'Total Classic Gray Hoodie', 'El hoodie gris definitivo. Universal, atemporal y fabricado con los estándares de calidad de la vieja escuela. Una prenda que no puede faltar en una colección de vintage premium.', 'Buzos', 145000, 'XL', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002876285-518df5c6b83d7c99bf17508623987910-1024-1024.webp');

-- Camisas
INSERT INTO product (code, name, description, category, price, size, stock, sold, state, image) VALUES
(201, 'Camisa Náutica', 'Elegante camisa náutica estampada, perfecta para aquellos que buscan un toque distintivo en su vestuario. Esta prenda destaca por su diseño sofisticado y su estampado único que captura la esencia del estilo náutico.', 'Camisas', 105000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000177192-0d353943eef2eae64617016492711986-1024-1024.webp'),
(202, 'Camisa Tommy Hilfiger', 'Camisa Tommy Hilfiger original de los 90s. Algodón gastado a la perfección. Una reliquia del grunge que solo aumentará su valor con el tiempo. Estampa craquelada auténtica.', 'Camisas', 95000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000522616-6fa7473e28693ee40617145192743134-1024-1024.webp'),
(203, 'Camisa Hawaiana 90s', 'Hermosa camisa hawaiana, marca david Taylor se encuentra con etiqueta, cuenta con bolsillo en su pecho, made in indonesia, se encuentra nueva.', 'Camisas', 85000, 'M', 3, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000187375-6ce3ee4676e868858617024258823403-1024-1024.webp'),
(204, 'Archival Flannel Patterned Shirt', 'Descubrí la atemporalidad de esta camisa de franela con un diseño de cuadros clásico. Confeccionada con algodón de tacto suave y un corte relajado inspirado en los años 90, es la prenda ideal para capas premium con estilo.', 'Camisas', 115000, 'L', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1001998092-082d8d315ebf8a2a6717355015023569-1024-1024.webp');

-- Pantalones
INSERT INTO product (code, name, description, category, price, size, stock, sold, state, image) VALUES
(302, 'Carpenter Pants Carhartt', 'Auténticos pantalones de trabajo Carhartt de los 90s. Doble rodilla, lona resistente color Camel. La estética workwear en su máxima expresión. Manchas de pintura originales que le dan carácter.', 'Pantalones', 60000, '34', 2, 0, 1, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80');

-- Remeras
INSERT INTO product (code, name, description, category, price, size, stock, sold, state, image) VALUES
(602, 'Remera Polo Ralph Lauren Big Logo Nueva', 'Remera Polo Ralph Lauren Big Logo Nueva, cuenta con su logo bordado en su pecho, made in Indonesia y es una verdadera belleza vintage para los que saben de historia.', 'Remeras', 90000, 'Única', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004049295-fe362e34b5b35eae1f17700574529308-1024-1024.webp'),
(701, 'Remera Polo Bear Nueva con etiqueta', 'Hermosa remera Polo Bear, nueva con etiqueta, cuenta con su estampado en el pecho, made in Vietnam. Remera Polo Bear Nueva con etiqueta, cuenta con su logo bordado en su pecho, made in Indonesia y es una verdadera belleza vintage para los que saben de historia.', 'Remeras', 90000, 'Única', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004049279-d981f8c4ca54ab444817700572402715-1024-1024.webp'),
(702, 'Jersey Celtic Boston NBA x Nike Walker', 'Hermoso jersey Celtic Boston NBA x Nike Walker, cuenta con su logo bordado en su pecho, made in Vietnam. Remera Polo Bear Nueva con etiqueta, cuenta con su logo bordado en su pecho, made in Indonesia y es una verdadera belleza vintage para los que saben de historia.', 'Remeras', 90000, 'Única', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002993022-7c370104ff8cb3774917524390305726-1024-1024.webp');

-- Vestidos
INSERT INTO product (code, name, description, category, price, size, stock, sold, state, image) VALUES
(801, 'Midnight Velvet Noir Slip', 'Una pieza de coleccionista inspirada en los años 40. Este vestido slip de corte al sesgo está confeccionado en terciopelo negro profundo, con una caída líquida y una flor bordada a mano en seda. Una silueta atemporal que redefine la elegancia nocturna.', 'Vestidos', 185000, 'M', 2, 0, 0, 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'),
(802, 'Victorian Revival Tea Dress', 'Rescatado de los años 70, este vestido camisero de inspiración victoriana destaca por su algodón de gramaje ligero, detalles de encaje calado y una caída romántica. Ideal para quienes buscan una estética etérea con historia en cada costura.', 'Vestidos', 145000, 'S/M', 1, 0, 0, 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80'),
(803, 'Golden Era Silk Slip', 'Una joya del Old Hollywood. Este slip de seda en tono champagne presenta un brillo nacarado y un escote drapeado exquisito. Una prenda que evoca el glamour de las divas de la pantalla grande, ideal para una noche de sofisticación absoluta.', 'Vestidos', 235000, 'S/M', 2, 0, 0, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80'),
(804, 'Sage Gardenia Silk Wrap', 'La sofisticación italiana en un diseño wrap. Teñido en un verde salvia polvoso con motivos florales de archivo, este vestido cuenta con volados arquitectónicos y una cintura definida. Una joya de seda que respira frescura y lujo.', 'Vestidos', 265000, 'M/L', 1, 0, 0, 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&q=80'),
(805, 'Paradiso Tropical Archival Mono', 'Un mono de seda de los 80 que captura el espíritu festivo. Confeccionado en un verde esmeralda vibrante con estampa de papagayos en contraste, esta pieza es un testimonio del diseño maximalista y la comodidad de la alta costura retro.', 'Vestidos', 245000, 'L', 1, 0, 0, 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80'),
(806, 'Sculptural Soirée Mini Dress', 'La silueta definitiva de los 90. Este mini dress de fiesta en noir absoluto presenta un drapeado escultural y un sutil detalle de strass en el escote. Una prenda diseñada para brillar sin esfuerzo bajo las luces de la ciudad.', 'Vestidos', 215000, 'S', 1, 0, 0, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'),
(807, 'Parisian Promenade Sketch Dress', 'Un vestido camisero en algodón premium con una estampa tipográfica y de bocetos inspirada en las calles de París. Sus manguitas con volados y el ajuste elástico en la cintura crean una figura femenina y artística, digna de una galería.', 'Vestidos', 165000, 'M', 2, 0, 0, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'),
(808, 'Modernist Mondrian Strapless', 'Arte para vestir. Este vestido strapless rinde homenaje al constructivismo con un diseño geométrico de bloques de color. Confeccionado en un textil elastizado de alta densidad que moldea la figura manteniendo una estética abstracta impecable.', 'Vestidos', 195000, 'S/M', 1, 0, 0, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'),
(809, 'Violacée Tulle Illusion Gown', 'Pura fantasía etérea. Un vestido de capas en microtul elastizado con estampado floral en degradé violeta. Sus mangas largas y transparencia sutil lo convierten en una pieza de ensueño para coleccionistas de lo sublime.', 'Vestidos', 285000, 'M', 1, 0, 0, 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&q=80');

-- Bermudas
INSERT INTO product (code, name, description, category, price, size, stock, sold, state, image) VALUES
(901, 'Archival Raw Denim Bermudas', 'Una pieza esencial de los años 90 con corte relaxed. Confeccionadas en denim rígido de alto gramaje y teñido índigo profundo, estas bermudas capturan la estética urbana original con una durabilidad excepcional.', 'Bermudas', 155000, 'L', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000185848-8506bd9181afffd15717023529456632-1024-1024.webp'),
(902, 'Heritage Canvas Utility Shorts', 'Funcionalidad de los años 80 en lona de algodón ultra resistente. Con bolsillos reforzados y un tono siena desgastado, esta prenda es ideal para quienes buscan un estilo aventurero con la pátina auténtica del tiempo.', 'Bermudas', 145000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000187207-4e2e75dc130ad8003f17024236510282-1024-1024.webp'),
(903, 'Classic Tailored Chino Bermudas', 'La elegancia del estilo prep en un corte sastrero clásico. En un tono arena versátil, estas bermudas de gabardina premium ofrecen una silueta pulida inspirada en las vacaciones de la élite de los años 70.', 'Bermudas', 135000, 'M', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003855391-da1fcd75af26043c9817667931949400-1024-1024.webp'),
(904, 'Retro Court Athletic Shorts', 'Inspiradas en el tenis profesional de los años 70. Confeccionadas en un piqué de algodón suave con detalles de ribetes en contraste, estas bermudas cortas son la definición de la comodidad retro deportiva de lujo.', 'Bermudas', 125000, 'S', 3, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000187290-11dc27c603253b976117024247204437-1024-1024.webp'),
(905, 'Soft Linen-Cotton Relaxed Shorts', 'Una pieza de aire mediterráneo. La mezcla de lino y algodón aporta una caída fluida y una frescura inigualable, perfecta para un look sofisticado sin esfuerzo bajo el sol de verano.', 'Bermudas', 165000, 'M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003860312-fc9e44b8aa35a9ecdc17668792780243-1024-1024.webp'),
(906, 'Rugged Distressed Vintage Denim', 'Denim auténtico con lavado a la piedra y detalles de desgaste natural. Una silueta noventera "oversize" que rinde homenaje a la cultura skate y grunge con un textil que solo mejora con el uso.', 'Bermudas', 175000, 'L', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003975092-1ae8c8205718f8b6d317694709752424-1024-1024.webp'),
(907, 'Archival Pleated Safari Bermudas', 'El pináculo del diseño utilitario. Presenta pinzas frontales, bolsillos cargo de perfil bajo y un acabado en algodón mercerizado que eleva la estética exploradora a una pieza de alta gama.', 'Bermudas', 185000, 'L', 2, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003975125-c5b34399b21506b14317694714475704-1024-1024.webp'),
(908, 'Modernist Minimalist Cotton Shorts', 'Sofisticación en negro absoluto. Un diseño de líneas puras y corte sastrero contemporáneo confeccionado en satén de algodón de alta densidad. Una prenda versátil que une el pasado vintage con el minimalismo moderno.', 'Bermudas', 145000, 'S/M', 1, 0, 1, 'https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003855481-8276182f442be5020d17667940447198-1024-1024.webp');

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
