# Könyvkezelő API készítése Express használatával

Készíts egy egyszerű Könyvkezelő API-t, amely lehetővé teszi könyvek hozzáadását, lekérdezését, frissítését és törlését.

Az adatok egy JavaScript tömbben tárolódnak, és minden könyv tartalmazza az alábbi mezőket: szerző, cím, év és kategória.

Hozz létre egy Express szervert.
Valósítsd meg a CRUD műveleteket az alábbi végpontokkal:
- **GET /books/categories** Az összes kategória listázása.
- **GET /books** Az összes könyv listázása.
- **GET /books/title/:searchedText** Egy könyv lekérdezése az cím részlet alapján.
- **GET /books/author/:author** Könyv lekérdezése az szerző alapján.
- **GET /books/categ/:categ** Könyv lekérdezése kategória alapján.
- **POST /books**  Új könyv hozzáadása (szerző, cím, év, kategória) a request body-ban.
- **PUT /books/:id**  Egy könyv adatainak teljes frissítése az ID alapján.
- **DELETE /books/:id**  Egy könyv törlése az ID alapján.

Implementálj **szerver oldali validációt**, amely ellenőrzi, hogy minden mező ki van-e töltve, amikor egy könyvet hozzáadnak vagy frissítenek.

Minden keresés kis-nagy betű érzéketlen legyen!

