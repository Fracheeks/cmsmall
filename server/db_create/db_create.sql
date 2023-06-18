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
INSERT INTO "users" VALUES (4, "Regular", 'francesca@test.com','Francesca', '123348dusd437840', 'bddfdc9b092918a7f65297b4ba534dfe306ed4d5d72708349ddadb99b1c526fb'); 
INSERT INTO "users" VALUES (1, "Regular", 'davide@test.com','Davide', '123348dusd437840', 'bddfdc9b092918a7f65297b4ba534dfe306ed4d5d72708349ddadb99b1c526fb'); 
INSERT INTO "users" VALUES (2,'Admin', 'admin@test.com','Admin', '123348pght437840', '6d2482e7d0760b6e9488763dfbfecfd00c08fdde9f2d87b417b515486fd5989b');
INSERT INTO "users" VALUES (3,'Regular', 'regular@test.com','Regular', '123348male437840', 'c6cee0e593f5cd635c48a59150b2b7c23321d0170301e41f65dbfe428fc2d7fd');

INSERT INTO "pages" VALUES (1, 1, 'Prima', '2023-06-10', '2023-06-11', NULL);
INSERT INTO "pages" VALUES (2, 1, 'Seconda', '2022-06-10', '2023-08-10', NULL);
INSERT INTO "pages" VALUES (3, 2, 'Terza', '2023-04-10', '2023-06-30', NULL);

INSERT INTO "components" VALUES (1, 1, 1, "Header", "Header content", NULL);
INSERT INTO "components" VALUES (2, 1, 2, "Paragraph", "Paragraph content", NULL);
INSERT INTO "components" VALUES (3, 1, 3, "Image", NULL, 1);
INSERT INTO "components" VALUES (4, 2, 1, "Header", "Header content", NULL);
INSERT INTO "components" VALUES (5, 2, 2, "Paragraph", "Paragraph content", NULL);
INSERT INTO "components" VALUES (6, 3, 1, "Header", "Header content", NULL);
INSERT INTO "components" VALUES (7, 3, 2, "Header", "Header content", NULL);
INSERT INTO "components" VALUES (8, 3, 3, "Image", NULL, 3);

INSERT INTO "images" VALUES (1, "House", "./images/house");
INSERT INTO "images" VALUES (2, "Mountain", "./images/mountain");
INSERT INTO "images" VALUES (3, "River", "./images/river");
INSERT INTO "images" VALUES (4, "Sky", "./images/sky");

COMMIT;