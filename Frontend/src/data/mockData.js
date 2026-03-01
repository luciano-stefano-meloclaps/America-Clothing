// Mock data para modo DEMO (sin backend)
// Basado en los datos de seed de la base de datos

export const mockProducts = [
  // Camperas
  {
    code: 101,
    name: "Campera rompevientos Nautica Spell Out 90s",
    description: "Hermosa campera rompevientos Nautica Spell Out época 90s, cuenta con su descripción de marca bordado, logo bordado en su pecho, capucha escondida, elástico en puños y cintura.",
    category: "Camperas",
    price: 125000,
    size: "L",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003947475-e0c8eb9a83f1a2e35917688662111869-1024-1024.webp"
  },
  {
    code: 401,
    name: "Bomber Jordan",
    description: "Hermosa bomber Jordan, cuenta con su logo bordado en su pecho, made in Vietnam.",
    category: "Camperas",
    price: 290000,
    size: "XL",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765991-8ad6856a3404c72e1b17652407693858-1024-1024.webp"
  },
  {
    code: 402,
    name: "Campera rompevientos Nike NSW 00s",
    description: "Hermosa campera rompevientos estilo bomber Nike NSW época 90s, cuenta con elástico en puños y cintura, big swoosh bordado en su pecho.",
    category: "Camperas",
    price: 210000,
    size: "M",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003765670-902feb95b23792add017652377303847-1024-1024.webp"
  },
  {
    code: 403,
    name: "Campera Nike Fútbol Arsenal inglés 80/90",
    description: "Una verdadera pieza de colección para los fanáticos del fútbol y del estilo retro. Este rompevientos Nike del mítico Arsenal de Inglaterra.",
    category: "Camperas",
    price: 270000,
    size: "M",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003416511-9df12af04c2ae3689617590920254063-1024-1024.webp"
  },
  {
    code: 1101,
    name: "Archival Heritage Windbreaker",
    description: "Una pieza de archivo impecable. Este rompevientos tricolor captura la esencia del diseño deportivo de los 90.",
    category: "Camperas",
    price: 225000,
    size: "L",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003247588-f03e70f43d74a27aa717560736049110-1024-1024.webp"
  },
  {
    code: 1103,
    name: "Retro Varsity Leather-Trim Bomber",
    description: "La definición de lo clásico americano. Confeccionada en un paño de lana premium con detalles de terminación de alta gama.",
    category: "Camperas",
    price: 315000,
    size: "XL",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003246847-5079f929f64fc23bc717560688928639-1024-1024.webp"
  },
  {
    code: 1105,
    name: "Vintage Court Side Zip-Up",
    description: "La elegancia del tenis de archivo. Una campera liviana con cierre completo y detalles de ribete en contraste.",
    category: "Camperas",
    price: 195000,
    size: "S",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003518077-a90063e378440b0ed317608940309275-1024-1024.webp"
  },
  {
    code: 1110,
    name: "Racing Spirit Heritage Jacket",
    description: "Inspirada en la cultura automovilística de los 80. Con parches bordados y un corte sastrero deportivo.",
    category: "Camperas",
    price: 295000,
    size: "M",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003312427-7b8f089cffbc18f0b717572774485956-1024-1024.webp"
  },

  // Buzos
  {
    code: 102,
    name: "Hoodie Nike Force KMA Basketball 00s",
    description: "Descubrí el Hoodie Nike Force KMA Basketball 00s, una prenda única que combina estilo retro con la calidad y confort de Nike.",
    category: "Buzos",
    price: 140000,
    size: "M",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004021579-267741caffd62de6d917695450905292-1024-1024.webp"
  },
  {
    code: 103,
    name: "Buzo rompevientos Nike Air Big Swoosh 90s",
    description: "Hermoso buzo rompevientos estilo bomber Nike Air Big Swoosh época 90s, una verdadera belleza vintage.",
    category: "Buzos",
    price: 210000,
    size: "M",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003920226-531a319dadd486460e17682478668317-1024-1024.webp"
  },
  {
    code: 301,
    name: "Buzo San Francisco 49ers NFL",
    description: "Hermoso buzo Team Apparel de San Francisco 49ers NFL, cuenta con su logo bordado y descripción de equipación.",
    category: "Buzos",
    price: 95000,
    size: "L",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003925419-fef770e372321369e417683531648152-1024-1024.webp"
  },
  {
    code: 501,
    name: "Buzo Nike Sportswear Swoosh",
    description: "Estilo clásico, comodidad total y el sello Nike en su punto justo. Con el icónico Swoosh al frente.",
    category: "Buzos",
    price: 175000,
    size: "42",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003518543-a5ee01808ea4dd92b017608996032008-1024-1024.webp"
  },
  {
    code: 1001,
    name: "Heritage Fleece Hoodie",
    description: "Descubrí la comodidad absoluta con este hoodie de algodón pesado. Corte relajado y textura suave.",
    category: "Buzos",
    price: 165000,
    size: "L",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003764998-bc99bbd328996e03bd17652325704762-1024-1024.webp"
  },
  {
    code: 1004,
    name: "Midnight Onyx Oversized Hoodie",
    description: "Sofisticación en negro absoluto. Este hoodie oversized está confeccionado con un fleece premium.",
    category: "Buzos",
    price: 195000,
    size: "L",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003311561-5860ae528e930a266217572730614121-1024-1024.webp"
  },

  // Camisas
  {
    code: 201,
    name: "Camisa Náutica",
    description: "Elegante camisa náutica estampada, perfecta para un toque distintivo en tu vestuario.",
    category: "Camisas",
    price: 105000,
    size: "L",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000177192-0d353943eef2eae64617016492711986-1024-1024.webp"
  },
  {
    code: 202,
    name: "Camisa Tommy Hilfiger",
    description: "Camisa Tommy Hilfiger original de los 90s. Algodón gastado a la perfección. Una reliquia del grunge.",
    category: "Camisas",
    price: 95000,
    size: "L",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000522616-6fa7473e28693ee40617145192743134-1024-1024.webp"
  },
  {
    code: 203,
    name: "Camisa Hawaiana 90s",
    description: "Hermosa camisa hawaiana, marca David Taylor, cuenta con bolsillo en su pecho, made in Indonesia.",
    category: "Camisas",
    price: 85000,
    size: "M",
    stock: 3,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000187375-6ce3ee4676e868858617024258823403-1024-1024.webp"
  },
  {
    code: 204,
    name: "Archival Flannel Patterned Shirt",
    description: "Camisa de franela con diseño de cuadros clásico. Algodón de tacto suave y corte relajado inspirado en los 90.",
    category: "Camisas",
    price: 115000,
    size: "L",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1001998092-082d8d315ebf8a2a6717355015023569-1024-1024.webp"
  },

  // Remeras
  {
    code: 602,
    name: "Remera Polo Ralph Lauren Big Logo Nueva",
    description: "Remera Polo Ralph Lauren Big Logo Nueva, cuenta con su logo bordado en su pecho.",
    category: "Remeras",
    price: 90000,
    size: "Única",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004049295-fe362e34b5b35eae1f17700574529308-1024-1024.webp"
  },
  {
    code: 701,
    name: "Remera Polo Bear Nueva con etiqueta",
    description: "Hermosa remera Polo Bear, nueva con etiqueta, cuenta con su estampado en el pecho.",
    category: "Remeras",
    price: 90000,
    size: "Única",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1004049279-d981f8c4ca54ab444817700572402715-1024-1024.webp"
  },
  {
    code: 702,
    name: "Jersey Celtic Boston NBA x Nike Walker",
    description: "Hermoso jersey Celtic Boston NBA x Nike Walker, una pieza de colección deportiva.",
    category: "Remeras",
    price: 90000,
    size: "Única",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1002993022-7c370104ff8cb3774917524390305726-1024-1024.webp"
  },

  // Bermudas
  {
    code: 901,
    name: "Archival Raw Denim Bermudas",
    description: "Pieza esencial de los 90 con corte relaxed. Denim rígido de alto gramaje y teñido índigo profundo.",
    category: "Shorts",
    price: 155000,
    size: "L",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1000185848-8506bd9181afffd15717023529456632-1024-1024.webp"
  },
  {
    code: 903,
    name: "Classic Tailored Chino Bermudas",
    description: "La elegancia del estilo prep en un corte sastrero clásico. Gabardina premium.",
    category: "Shorts",
    price: 135000,
    size: "M",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003855391-da1fcd75af26043c9817667931949400-1024-1024.webp"
  },
  {
    code: 906,
    name: "Rugged Distressed Vintage Denim",
    description: "Denim auténtico con lavado a la piedra y detalles de desgaste natural. Silueta noventera oversize.",
    category: "Shorts",
    price: 175000,
    size: "L",
    stock: 1,
    sold: 0,
    state: 1,
    image: "https://acdn-us.mitiendanube.com/stores/001/048/003/products/1003975092-1ae8c8205718f8b6d317694709752424-1024-1024.webp"
  },

  // Vestidos - Removidos para mostrar 'Catálogo en Preparación'

  // Pantalones
  {
    code: 302,
    name: "Carpenter Pants Carhartt",
    description: "Auténticos pantalones de trabajo Carhartt de los 90s. Doble rodilla, lona resistente color Camel.",
    category: "Jeans",
    price: 60000,
    size: "34",
    stock: 2,
    sold: 0,
    state: 1,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"
  },
];

export const mockUsers = [];

export const mockSaleOrders = [];
