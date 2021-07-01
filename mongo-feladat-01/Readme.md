# MongoDB alapfeladatok terminálban (Mongo shell-ben)

Elsőként olvasd végig az összes pontot!

1. Készíts egy videoStore nevű MongoDB adatbázist!

    ```
    use videoStore
    ```
2. Hozz létre benne egy movies listát!

    ```
    db.movies.find()
    ```
3. Ments el benne 10 új filmet (save()) a következő mezőkkel:
- _id: legyen generált, ObjectId
- title: egy-egy kedvenc film címe, szöveges tartalom
- category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet
- director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron

    ```
  db.movies.save([
      {title: "Jurassic Park", category: "fantasy", director: "Steven Spielberg"},
      {title: "E.T.", category: "fantasy", director: "Steven Spielberg"},
      {title: "Schindler listája", category: "action", director: "Steven Spielberg"},
      {title: "Kapj el, ha tudsz", category: "action", director: "Steven Spielberg"},
      {title: "A zöldfülű", category: "action", director: "Clint Eastwood"},
      {title: "Sully – Csoda a Hudson folyón", category: "action", director: "Clint Eastwood"},
      {title: "Elcserélt életek", category: "romantic", director: "Clint Eastwood"},
      {title: "Titanic", category: "romantic", director: "James Cameron"},
      {title: "Avatar", category: "romantic", director: "James Cameron"},
      {title: "Terminátor – A halálosztó", category: "fantasy", director: "James Cameron"}
  ])
    ```

4. Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!

    ```
    db.movies.updateMany({}, {$set:{ratings:[]}})
    ```

5. Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!

    ```
    db.movies.updateOne({title: "Jurassic Park"}, {$push:{ratings: 2}})

    db.movies.updateOne({title: "Sully – Csoda a Hudson folyón"}, {$push:{ratings: 5}})

    db.movies.updateOne({title: "Avatar"}, {$push:{ratings: 1}})
    ```

6. Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!

    ```
    db.movies.updateMany({}, {$set:{releaseYear: 2000}})
    ```

7. Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!<br>
**Tipp**: db.courses.updateMany( {}, [{$set: {title: {$toUpper: "$title"} }}] )

    ```
    db.movies.updateMany({},[{$set: {category: {$toUpper: "$category"}}}])
    ```

8. Kérdezd le az adatokat, hogy ellenőrizd, sikeresek lettek-e a frissítések! Most így kellene kinéznie a listának:

    ![8](/mongo-feladat-01/img/8.png)

    ```
    db.movies.find({})
    ```

9. Kicsit algoritmizáljunk! Nézd meg, hogy melyik könyvtárban állsz a pwd() parancs segítségével. Hozz létre egy .js kiterjesztésű szöveges fájlt az adott könyvtárban! (Használhatsz majd abszolút elérési utat is később.) Bármilyen szerkesztő, IDEA megfelelő a szerkesztésre. Készíts el benne egy függvényt (ne felejtsd el meghívni a fájl végén), amely tartalmazzon egy listát benne a te filmjeid címeivel (figyelj a pontos címek megadására). Kiindulásként egy kis „segédkép”:

    ![9](/mongo-feladat-01/img/9.png)

    ```
    function setMoviesYear () {
      const movies = ['Jurassic Park', 'E.T.', 'Schindler listája', 
        'Kapj el, ha tudsz', 'A zöldfülű', 'Sully – Csoda a Hudson folyón', 
        'Elcserélt életek', 'Titanic', 'Avatar', 'Terminátor – A halálosztó']
    }
    setMoviesYear()
    ```

10. Folytasd a script írását! Cél, hogy mindegyik film különböző éveket kapjon az adatbázisban, de a filmek hármasával egy évtizedben legyenek. Törekedj a funkcionális egyszerű kódra. Futtasd le a Mongo shell-ben a scriptet a load() parancs segítségével. Utána kérdezd le az adatbázisodat ellenőrizni az eredményt. Íme egy lehetséges elvárt eredmény:

    ![10](/mongo-feladat-01/img/10.png)

    *setMoviesYear.js:*

    ```
    function randomInRange (start, end) {
      return Math.floor(Math.random() * (end - start + 1) + start)
    }

    function setMoviesYear () {
      const movies = ['Jurassic Park', 'E.T.', 'Schindler listája',
        'Kapj el, ha tudsz', 'A zöldfülű', 'Sully – Csoda a Hudson folyón',
        'Elcserélt életek', 'Titanic', 'Avatar', 'Terminátor – A halálosztó']

      const decades = [1990, 2000, 2010, 2020]

      for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 3; i++) {
          const year = randomInRange(decades[j] - 9, decades[j])
          if (j * 3 + i < movies.length) {
            db.movies.updateOne({ title: movies[j * 3 + i] }, { $set: { releaseYear: year } })
          }
        }
      }
    }

    setMoviesYear()
    ```
    *Script futtatása a parancssoron:*

    ```
    load("setMoviesYear.js")
    ```

    *Adatok lekérdezése:*

    ```
    db.movies.find()
    ```