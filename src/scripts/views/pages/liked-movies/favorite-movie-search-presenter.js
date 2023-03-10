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

  async _searchMovies(latestQuery) {
    this._latestQuery = latestQuery;
    const foundMovies = await this._favoriteMovies.searchMovies(this._latestQuery);
    this._showFoundMovies(foundMovies);
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
    document.getElementById('movie-search-container')
      .dispatchEvent(new Event('movies:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteMovieSearchPresenter;
