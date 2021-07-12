function paging () {
  const numberOfMovies = db.movies.find({}).count();
  const onePageLength = 3;
  const numberOfPages = Math.ceil(numberOfMovies / onePageLength);

  for (let i = 0; i < numberOfPages; i++) {
    for (let j = 0; j < onePageLength; j++) {
      if (onePageLength * i + j < numberOfMovies) {
        const film = db.movies.find({}, { title: 1, category: 1, _id: 0 })[onePageLength * i + j];
        print(`${film.title}: ${film.category.toLowerCase()} movie`);
      }
    }
    if (i < numberOfPages - 1) {
      print("--page over--");      
    }
  }
}
paging();
