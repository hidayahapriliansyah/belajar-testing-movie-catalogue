import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import * as TestFactories from './helper/testFactories';

describe('unliking a movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteMovieIdb.putMovie({ id: 1 });
  });

  afterEach(() => {
    FavoriteMovieIdb.deleteMovie(1);
  });

  it('should display unlike widget when the movie has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="like this movie"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked movie from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });

  it('should not throw error if the unliked movie is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithMovie({ id: 1 });

    // hapus dulu film na
    await FavoriteMovieIdb.deleteMovie(1);

    // pencet si unlike na
    document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
