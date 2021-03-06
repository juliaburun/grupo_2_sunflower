create database if not exists  `sunflower_db`;
use `sunflower_db`;

create TABLE `categories`(
`id` int(20) unsigned auto_increment,
`name` varchar(100) not null,
primary key (`id`));


create table `products`(
`id` int(20) unsigned auto_increment,
`name` varchar(100) not null,
`description` text not null,
`price` int(20) unsigned not null,
`discount` int unsigned  not null,
`image` varchar(255),
`category_id` int(20) unsigned,
`deleted` int unsigned not null default 0,
`date_sale` date,
primary key(`id`),
constraint `fk_products_category_id` foreign key (`category_id`) references `categories`(`id`) on delete cascade on update cascade);


create TABLE `sizes`(
`id` int(20) unsigned auto_increment,
`name` varchar(100) not null,
primary key (`id`));

create TABLE `sizesProducts`(
`id` int(20) unsigned auto_increment,
`product_id` int(20) unsigned,
`size_id` int(20)  unsigned,
primary key (`id`),
constraint `fk_sizesProducts_product_id` foreign key (`product_id`) references `products`(`id`) on delete cascade on update cascade,
constraint `fk_sizesProducts_size_id` foreign key (`size_id`) references `sizes`(`id`) on delete cascade on update cascade);

create TABLE `roles`(
`id` int(20) unsigned auto_increment,
`name` varchar(100) not null,
primary key (`id`));

create table `users`(
`id` int(20) unsigned auto_increment,
`first_name` varchar(100) not null,
`last_name` varchar(100) not null,
`email` varchar(255) not null,
`phone` varchar(60) not null,
`password` varchar(255) not null,
`image_profile` varchar(255),
`rol_id` int(20) unsigned,
`deleted` int unsigned not null default 0,
primary key(`id`),
constraint `fk_users_rol_id` foreign key (`rol_id`) references `roles`(`id`) on delete cascade on update cascade);

create TABLE `carts`(
`id` int(20) unsigned auto_increment,
`date_cart` date,
`user_id` int(20) unsigned,
`total` int(100) unsigned not null,
`finished` int unsigned not null default 0, 
primary key (`id`),
constraint `fk_carts_user_id` foreign key (`user_id`) references `users`(`id`) on delete cascade on update cascade);

create TABLE `productsCarts`(
`id` int(20) unsigned auto_increment,
`product_id` int(20) unsigned,
`cart_id` int(20) unsigned,
`amount` int(50) unsigned not null,
`subtotal` int(100) unsigned not null,
primary key (`id`),
constraint `fk_productsCarts_product_id` foreign key (`product_id`) references `products`(`id`) on delete cascade on update cascade,
constraint `fk_productsCarts_cart_id` foreign key (`cart_id`) references `carts`(`id`) on delete cascade on update cascade);


use `sunflower_db`;
delete from `carts`;
delete from `categories`;
delete from `products`;
delete from `productscarts`;
delete from `roles`;
delete from `sizes`;
delete from `sizesproducts`;
delete from `users`; 

insert into categories (name) values ('Plantas de interior');

insert into categories (name) values ('Plantas de exterior');

insert into sizes (name) values ('10');

insert into sizes (name) values ('20');

insert into sizes (name) values ('30');

insert into sizes (name) values ('40');


insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Geranio', 'Los geranios son plantas de exterior con flores de atractivos y colores vivos que florecen durante el verano y son bastante resistentes. Los geranios son plantas de exterior con flores de colores vivos. Florecen durante el verano y son bastante resistentes. Se suelen cultivar en el jard??n, en la terraza o el balc??n pero tambi??n se pueden mantener en interior, siempre y cuando se coloque en un lugar muy luminoso alejados de la calefacci??n.',
1200, 15,'img-products-geranio-2.png', 1, 0, '2022-02-15');

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Helecho', 'Los helechos, son plantas vasculares sin semilla (pteridofitas), cuyas caracter??sticas morfol??gicas m??s sobresalientes son sus hojas grandes, usualmente pinadas y con prefoliaci??n circinada. La cantidad de especies y formas de los helechos les convierte en unas de las plantas m??s atractivas y espectaculares para decorar terrazas y jardines, pero tambi??n como planta de interior. En este art??culo te vamos a contar como cuidarlas para que te duren mucho y se vean siempre bonitas y con vida.',
700, 10, 'img-products-helecho.png', 1, 0, '2022-02-15');

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Lavanda','Planta medicinal para tratar heridas y quemaduras. La lavanda toma su nombre del lat??n lavare (lavar), y se ha utilizado durante siglos para aromatizar aceite de ba??o y jabones. Es originaria del Mediterr??neo y sigue estrechamente relacionada con la industria del perfume del sur de Francia. Sus flores son apreciadas por sus virtudes calmantes y sedantes, y el aceite esencial se utiliza para los dolores musculares y los problemas respiratorios.',
2500, 30,'img-products-lavanda.png', 2, 0, '2022-02-25');

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Erica','Una planta bonita y f??cil de cuidar. Es perfecta para tener en el jard??n, ya sea plantada a ambos lados de una entrada, o delimitando caminos. Capaz de vivir muchos a??os incluso si se cultiva en maceta. La Erica, llamada a veces brezo, es una planta que se ve hermosa durante gran parte del a??o, siendo el oto??o el momento en el que se llena de flores. As??, vale la pena tenerla en cuenta para darle color al patio o al rinc??n verde del hogar.',
1000, 15,'img-products-erica.png', 2, 0, '2022-02-17');

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Homalomena', 'Es una interesante planta adecuada para entornos de interior gracias a su ornamental follaje. Goza de unas bell??simas hojas de naturaleza permanente. El g??nero de las Homalomena procede de diversas partes tropicales de Asia y Am??rica del Sur y lo determinan plantas de condici??n perenne. No es raro que produzca flores, a??n en los espacios cerrados de una vivienda si se dan las condiciones oportunas.',
2200, 0,'img-products-selby1.jpg', 1, 0, null);

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Ficus-lyrata', 'LA PLANTA DE TENDENCIA. El ficus lyrata destaca por sus hojas verdes y su presencia. Es una planta perfecta para decorar cualquier rinc??n y amenaza con conquistar esta temporada el reinado del helecho. El ficus lyrata es una planta tropical procedente de ??frica perfecta para interiores. Su nombre es un homenaje a la lira ya que sus hojas tienen la forma de ese instrumento de cuerda. Aunque tambi??n se la conoce como higuera de hojas de viol??n, ??rbol lira o ficus lirado.',
3500, 0,'img-products-ficus-lyrata.png', 1, 0, null);

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Fittonia', 'La Fitonia (Fittonia verschaffeltii) es una planta de interior de tipo rastrero. Se caracteriza por su peque??o tama??o, perfecto como tapiz para realizar composiciones con plantas de mayor tama??o. Se caracteriza por sus hojas, de color verde y con venas o nervaduras de color que contrastan con el resto de la hoja. Es una planta que alcanza muy poca altura, unos 15 cent??metros. Este porte rastrero la hace perfecta como complemento en composiciones de plantas. Las distintas variedades permiten encontrar multitud de patrones de colores en sus hojas que van desde el blanco o plateado, al amarillo, rojo intenso o morado.',
1600, 10,'img-products-fittonia.png', 1, 0, '2022-02-27');

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Sanseviera', 'La sansevieria es una planta f??cil de cultivar y una superviviente nata en cualquier espacio: aguanta temperaturas elevadas y tambi??n bajas (hasta -5??C). Resulta muy decorativa con sus hojas robustas y verticales, su verde ??atigrado?? y el borde de las hojas entre verde lima y amarillo. Adem??s, ??es una gran limpiadora del aire interior de la casa!. La sansevieria, tambi??n conocida como lengua de suegra, es una de las plantas recomendadas por la NASA (Administraci??n Nacional de la Aeron??utica y del Espacio de Estados Unidos) para eliminar del aire que respiramos t??xicos como el benceno, el tolueno, el xileno, el tricloroetileno y el formaldeh??do. Y a??ade a esto que es muy resistente a las plagas; incluso los ??caros lo tienen dif??cil con ella. Por todo ello, est?? el top ten de las que no pueden faltar en tu casa si eres principiante.',
600, 20,'img-products-sanseviera.png', 1, 0, '2022-02-11');

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Suculenta', 'Las plantas suculentas se han convertido en unas habituales tanto para los amantes de la jardiner??a como para quienes tienen poca mano con ella. El hecho de que ocupen poco espacio y que, adem??s, pueden crecer en casi en cualquier sitio (ya sea en interior o en exterior) convierten a las suculentas en una apuesta genial para tener un pedacito de Naturaleza en casi cualquier espacio. Una manera genial de evitarles plagas, deformaciones o, incluso, la muerte (algo realmente complicado por el tipo de planta que son: Poca Agua, Mucha luz, drenaje y un suelo sencillo.',
900, 20,'img-products-suculenta-variada.jpg', 2, 0, '2022-02-09');

insert into products (name, description, price, discount, image, category_id, deleted, date_sale) values 
('Lirio azul', 'Origen: Europa. Rizoma rastrero. Altura: 60-90 cm de altura. Hojas: acintadas de 35-45 cm de largo por 1,5 a 3 cm de ancho, erguida y de color verde claro. Flores grandes, perfumadas en n??mero de 3 a 6, generalmente purp??reas o de color violeta en las formas espont??neas. Hay variedades del violeta al blanco, al amarillo y al rojo, con elegantes jaspeados. El jugo de su ra??z puede ser usado como purgante. Es frecuente que la ra??z de los lirios se usara antiguamente para fabricar p??cimas de amor, o incluso para ahuyentar los malos esp??ritus. El polvo de color crema oscuro no tiene ning??n atractivo visual, pero es importante como fijativo para popurr??s y como elemento de relleno de saquitos perfumados. Tiene la cualidad de perfumar y de mantener los olores de las dem??s plantas con las que se mezcla.
Las personas que vieron este producto tambi??n vieron', 2300, 10,'productImg1636146969187.webp', 2, 0, '2022-03-22');


insert into sizesproducts (product_id, size_id)
values (1, 2);

insert into sizesproducts (product_id, size_id)
values ( 1 , 3);

insert into sizesproducts (product_id, size_id)
values (2, 2);

insert into sizesproducts (product_id, size_id)
values (3, 2);

insert into sizesproducts (product_id, size_id)
values (3, 3);

insert into sizesproducts (product_id, size_id)
values (4, 3);

insert into sizesproducts (product_id, size_id)
values (5, 3);

insert into sizesproducts (product_id, size_id)
values ( 6, 1);

insert into sizesproducts (product_id, size_id)
values ( 6, 4);

insert into sizesproducts (product_id, size_id)
values ( 7, 3);

insert into sizesproducts (product_id, size_id)
values ( 8, 2);

insert into sizesproducts (product_id, size_id)
values ( 9, 1);

insert into sizesproducts (product_id, size_id)
values ( 10, 1);


insert into roles (name) values ('administrador');
insert into roles (name) values ('usuario');

INSERT INTO users (first_name,last_name,email,phone,password,image_profile,rol_id,deleted) VALUES
	 ('Ariel','Cruz','arielc@mail.com','65473456','$2a$10$0DnhdmF3QWF7qbRy1yuJjevF68QgUOQRqy.witt4Nm92L2l/PuJGu','userImg1642821769129.jpg',1,0),
	 ('Julia','Burundarena','juliab@mail.com','634523348','$2a$10$Zs6jM5CuhQ2R1sptH2JRvuBAQKv3l1gPQjoUMu2r48w86..Jjc9SK','userImg1642822079572.jpeg',1,0),
	 ('Mike','Wazowski','mikew@mail.com','45567853345','$2a$10$/BACF0zW10OpkJ6Ts3pv3eHx97bl/393/5eM5lPtMjTg2UCtHFbxO','userImg1642822203814.png',2,0),
	 ('Johanna','Ni??o','johy@gmail.com','3017082187','$2a$10$3bnzEwUDeOeYDEK0XyPOm.XTJQAV1Ozuw7lD1qd5V18wzpPsvjCdO','userImg1642821424273.jpg',1,0),
	 ('pruebaCliente','Cliente','cliente@gmail.com','3017082187','$2a$10$qLzf.sI2eRqAodUclbJBjOhg4S2Rg3gxiZvTNoxFJ90VxQs067vHC','user.jpg',2,0);







