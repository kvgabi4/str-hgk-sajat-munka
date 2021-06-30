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
