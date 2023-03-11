class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies, view }) {
    this._view = view;
    this._favoriteMovies = favoriteMovies;
    this._listenToSearchQueryByUser();
  }

  _listenToSearchQueryByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchMovies(latestQuery);
    });
  }

  async _searchMovies(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundMovies;
    if (this._latestQuery.length > 0) {
      foundMovies = await this._favoriteMovies.searchMovies(this._latestQuery);
    } else {
      foundMovies = await this._favoriteMovies.getAllMovies();
    }

    this._showFoundMovies(foundMovies);
  }

  // eslint-disable-next-line class-methods-use-this
  _showFoundMovies(movies) {
    this._view.showFavoriteMovies(movies);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteMovieSearchPresenter;
