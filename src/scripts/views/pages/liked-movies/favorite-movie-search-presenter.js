class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies }) {
    this._listenToSearchQueryByUser();
    this._favoriteMovies = favoriteMovies;
  }

  _listenToSearchQueryByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchMovies(event.target.value);
    });
  }

  _searchMovies(latestQuery) {
    this._latestQuery = latestQuery;
    this._favoriteMovies.searchMovies(this._latestQuery);
  }

  // eslint-disable-next-line class-methods-use-this
  _showFoundMovies(movies) {
    const html = movies.reduce(
      (carry, movie) => carry.concat(`
        <li class="movie">
          <span class="movie__title">${movie.title || '-'}</span>
        </li>
      `),
      '',
    );
    document.querySelector('.movies').innerHTML = html;
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteMovieSearchPresenter;
