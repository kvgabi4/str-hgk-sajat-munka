# Gyakorlófeladat #

Egészítsd ki az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást **CRUD-műveletekkel**!

1. Implementáld a GET /person/:id/vaccinated végpontot, amely visszaadja, hogy az adott id-val rendelkező személy rendelkezik-e oltással! (Tipp: használd a parseInt() függvényt!)
1. Implementáld a POST /person végpontot, amellyel új személyt vehetünk fel a nyilvántartásba! (Ne felejtsd el telepíteni a body-parser csomagot!)
1. Implementáld a PUT /person/:id/:vaccine végpontot, amellyel megadhatjuk, hogy az adott id-val rendelkező személy vaccine típusú oltást kapott.
1. Implementáld a DELETE /person/:vaccine végpontot, amely a vaccine típusú oltással rendelkező személyeket törli az adatbázisból.

Minden elkészült végpontot tesztelj böngésző segítségével!