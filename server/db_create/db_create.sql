BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "users" (
 "id"  INTEGER PRIMARY KEY AUTOINCREMENT,
 "role"  TEXT,
    "email"  TEXT,
 "name"  TEXT,
 "salt"  TEXT,
 "password" TEXT
);

CREATE TABLE IF NOT EXISTS "pages" (
 "id"  INTEGER PRIMARY KEY AUTOINCREMENT,
"authorId" INTEGER,
 "title"  TEXT,
 "creationDate" DATE,
 "publicationDate" DATE NULL,
 "status" TEXT
);

CREATE TABLE IF NOT EXISTS "components" (
 "id"  INTEGER PRIMARY KEY AUTOINCREMENT,
 "pageId" INTEGER,
 "orderId" INTEGER,
 "type"     TEXT,
 "content" TEXT NULL,
 "imageId" TEXT NULL
);

CREATE TABLE IF NOT EXISTS "images" (
 "id"  INTEGER PRIMARY KEY AUTOINCREMENT,
 "name"  TEXT,
 "url"     TEXT
);  

--password = 'pwd' for all
INSERT INTO "users" VALUES (1, "Regular", 'francesca@test.com','Francesca', '123348dusd437840', 'bddfdc9b092918a7f65297b4ba534dfe306ed4d5d72708349ddadb99b1c526fb'); 
INSERT INTO "users" VALUES (2,'Admin', 'admin@test.com','Admin', '123348pght437840', '6d2482e7d0760b6e9488763dfbfecfd00c08fdde9f2d87b417b515486fd5989b');
INSERT INTO "users" VALUES (3,'Regular', 'matteo@test.com','Matteo', '123348male437840', 'c6cee0e593f5cd635c48a59150b2b7c23321d0170301e41f65dbfe428fc2d7fd');
INSERT INTO "users" VALUES (4, "Regular", 'davide@test.com','Davide', '123348dusd437840', 'bddfdc9b092918a7f65297b4ba534dfe306ed4d5d72708349ddadb99b1c526fb'); 


INSERT INTO "pages" VALUES (1, 1, 'Iron Man 4', '2023-06-10', '2023-06-11', "published");
INSERT INTO "pages" VALUES (2, 1, 'PoliTo', '2022-06-10', '2023-08-10', "published");
INSERT INTO "pages" VALUES (3, 2, 'SalTo', '2023-04-10', '2023-06-30', "draft");
INSERT INTO "pages" VALUES (4, 3, 'Topolino', '2024-04-10', NULL , "scheduled");

INSERT INTO "components" VALUES (1, 1, 1, "Header", "Robert Downey Jr. parla di un possibile ritorno in Iron Man 4?", NULL);
INSERT INTO "components" VALUES (2, 1, 2, "Paragraph", "Iron Man, ossia Robert Downey Jr. è stato il volto del Marvel Cinematic
 Universe per quasi 12 anni, da Iron Man del 2008 fino all’uscita di Avengers: Endgame nel 2019. Anche se il personaggio è apparso 
 nella sua trilogia e in quattro film dei Vendicatori prima di sacrificarsi per il bene dell’universo, i fan continuano a sperare 
 in un possibile ritorno prima o poi. Dopo tutto, i Marvel Studios sono stati impegnati negli ultimi tempi a raccontare storie 
 nel multiverso del franchise.", NULL);
INSERT INTO "components" VALUES (3, 1, 3, "Image", NULL, 1);
INSERT INTO "components" VALUES (4, 2, 1, "Header", "Il Politecnico oltre le barriere", NULL);
INSERT INTO "components" VALUES (5, 2, 2, "Paragraph", "Il 25 novembre si celebra la Giornata internazionale
 per l’eliminazione della violenza contro le donne: quest'anno  è cominciata con l’inaugurazione presso 
 la Sede Centrale dell’installazione raffigurante una panchina rossa; donata dalla sezione Verde Pubblico della Città di Torino, 
 è un'iniziativa promossa dal Comitato Unico di Garanzia come simbolo e monito permanente contro i femminicidi e la violenza di genere.", NULL);
INSERT INTO "components" VALUES (6, 3, 1, "Header", "SalTO", NULL);
INSERT INTO "components" VALUES (7, 3, 2, "Header", "Edizione 2022/2023", NULL);
INSERT INTO "components" VALUES (8, 3, 3, "Image", NULL, 3);
INSERT INTO "components" VALUES (9, 4, 1, "Header", "Topolino !", NULL);
INSERT INTO "components" VALUES (10, 4, 2, "Paragraph", "Topolino, conosciuto negli Stati Uniti e in molti altri 
Paesi come Mickey Mouse, è un personaggio immaginario dei fumetti e dei cartoni animati creato il 16 gennaio
 1928 da Walt Disney e Ub Iwerks, e successivamente sviluppato da Floyd Gottfredson, fra i più famosi 
 fumettisti al mondo e icona stessa della Walt Disney Company e della cultura popolare mondiale.", NULL);
INSERT INTO "components" VALUES (11, 4, 3, "Image", NULL, 4);

INSERT INTO "images" VALUES (1, "Iron Man", "./images/ironman.jpg");
INSERT INTO "images" VALUES (2, "New York", "./images/newyork.jpg");
INSERT INTO "images" VALUES (3, "SalTO", "./images/salto.jpg");
INSERT INTO "images" VALUES (4, "Topolino", "./images/topolino.jpg");

COMMIT;